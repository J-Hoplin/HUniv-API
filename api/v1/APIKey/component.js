const { v4 } = require('uuid');
const { APIKey } = require('../../../mongo/schema');
const {
    KeyAlreadyIssued,
    KeyNotIssuedYet,
} = require('../../../Exceptions').api.v1.APIKeyException;

exports.getCheckToken = async (req) => {
    const {
        id,
    } = req.decoded;
    const user = await APIKey.findOne({ userid: id });
    if (!user) {
        throw new KeyNotIssuedYet();
    }
    return user.apikey;
};

exports.getIssueAPIToken = async (req) => {
    const {
        id,
    } = req.decoded;
    const newToken = v4();
    const user = await APIKey.findOne({ userid: id });
    if (user) {
        throw new KeyAlreadyIssued();
    }
    await APIKey.create({
        userid: id,
        apikey: newToken,
    });
    return newToken;
};

exports.getRefreshedToken = async (req) => {
    const {
        id,
    } = req.decoded;
    const checkUser = await APIKey.findOne({ userid: id });
    if (!checkUser) {
        throw new KeyNotIssuedYet();
    }
    await APIKey.deleteOne({ userid: id });
    const newToken = v4();
    await APIKey.create({
        userid: id,
        apikey: newToken,
    });
    return newToken;
};
