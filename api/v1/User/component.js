const {
    UserNotFound,
    PasswordUnmatched,
} = require('../../../Exceptions').api.v1.AuthException;
const { User } = require('../../../models');
const bcrypt = require('bcrypt');

exports.getUserInfo = async (req) => {
    const {
        id,
    } = req.query;
    const user = await User.findOne({
        attributes: ['id', 'nickname', 'email', 'role'],
        where: {
            id,
        },
        raw: true,
    });
    if (!user) {
        throw new UserNotFound(id);
    }
    return user;
};

exports.getUserList = async (req) => {
    let {
        limit,
        offset,
    } = req.query;
    limit = parseInt(limit, 10) || parseInt(process.env.DEFAULT_LIMIT, 10);
    offset = parseInt(offset, 10) * parseInt(process.env.DEFAULT_PAGINATION, 10)
        || parseInt(process.env.DEFAULT_OFFSET, 10) * parseInt(process.env.DEFAULT_PAGINATION, 10);
    const userlist = await User.findAll({
        attributes: ['id', 'nickname', 'email', 'role'],
        limit,
        offset,
    });
    return userlist;
};

exports.changePassword = async (req) => {
    const {
        id,
    } = req.decoded;
    const {
        password,
        newpassword,
    } = req.body;
    const user = await User.findOne({
        where: {
            id,
            role: 'user',
        },
    });
    if (!await bcrypt.compare(password, user.password)) {
        throw new PasswordUnmatched();
    }
    const newHashedPassword = await bcrypt
        .hash(newpassword, parseInt(process.env.ENCRYPT_COUNT, 10));
    await User.update({
        password: newHashedPassword,
    }, {
        where: {
            id,
            role: 'user',
        },
    });
    return true;
};
