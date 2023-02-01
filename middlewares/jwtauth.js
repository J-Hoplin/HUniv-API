const jwt = require('jsonwebtoken');
const ms = require('ms');
const redis = require('../redis');
const Codes = require('../Code');

const convertToSecond = (time) => ms(time) / 1000;

exports.verifyToken = async (req, res, next) => {
    try {
        req.decoded = jwt.verify(
            req.headers.authorization.split(' ')[1],
            process.env.JWT_SECRET,
        );
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(Codes.JWT_EXPIRED.httpCode).json(
                Codes.messageCommon(Codes.JWT_EXPIRED),
            );
        }
        return res.status(Codes.JWT_INVALID_TOKEN.httpCode).json(
            Codes.messageCommon(Codes.JWT_INVALID_TOKEN),
        );
    }
};

exports.generateToken = async (req, res, next) => {
    const { id } = req.user;
    const authToken = jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_AUTH_EXPIRE,
            issuer: process.env.JWT_ISSUER,
        },
    );
    const refreshToken = jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRE,
            issuer: process.env.JWT_ISSUER,
        },
    );
    await redis.setEx(
        id,
        convertToSecond(process.env.JWT_REFRESH_EXPIRE),
        refreshToken,
    );
    return res.status(Codes.OK.httpCode).json(
        Codes.messageWithToken(Codes.OK, authToken),
    );
};

exports.refreshTokenPreprocess = async (req, res, next) => {
    try {
        // If authtoken not yet expired
        const payload = jwt.verify(
            req.headers.authorization.split(' ')[1],
            process.env.JWT_SECRET,
        );
        const refreshToken = await redis.get(payload.id);
        req.refresh = {
            id: payload.id,
            token: refreshToken,
        };
        return next();
    } catch (err) {
        // If authtoken expired
        if (err.name === 'TokenExpiredError') {
            // Get payload of token without expired
            const payload = jwt.verify(
                req.headers.authorization.split(' ')[1],
                process.env.JWT_SECRET,
            );
            const refreshToken = await redis.get(payload.id);
            req.refresh = {
                id: payload.id,
                token: refreshToken,
            };
            return next();
        }
        // If exception is not type of expired error -> Make Invalid exception
        return res.status(Codes.JWT_INVALID_TOKEN.httpCode).json(
            Codes.messageCommon(Codes.JWT_INVALID_TOKEN),
        );
    }
};

exports.refreshTokenRegenrate = async (req, res, next) => {
    const {
        id,
        token,
    } = req.refresh;
    // If JWT Token not found
    if (!token) {
        return res.status(Codes.JWT_EXPIRED.httpCode).json(
            Codes.messageCommon(Codes.JWT_EXPIRED),
        );
    }
    try {
        // verify refresh token
        jwt.verify(
            token,
            process.env.JWT_SECRET,
        );
        // Generate new token if refresh token is valid
        const authToken = jwt.sign(
            {
                id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_AUTH_EXPIRE,
                issuer: process.env.JWT_ISSUER,
            },
        );
        return res.status(Codes.OK.httpCode).json(
            Codes.messageCommon(Codes.OK, authToken),
        );
    } catch (err) {
        // If refresh token's state is unable to verify
        return res.status(Codes.JWT_INVALID_TOKEN.httpCode).json(
            Codes.messageCommon(Codes.JWT_INVALID_TOKEN),
        );
    }
};
