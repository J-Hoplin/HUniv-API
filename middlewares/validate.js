const { JoiValidationException } = require('../Exceptions').validator;

exports.queryValidate = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.query);
        return next();
    } catch (error) {
        const err = new JoiValidationException(error.message);
        return next(err);
    }
};

exports.paramValidate = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.params);
        return next();
    } catch (error) {
        const err = new JoiValidationException(error.message);
        return next(err);
    }
};

exports.bodyValidate = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        return next();
    } catch (error) {
        const err = new JoiValidationException(error.message);
        return next(err);
    }
};
