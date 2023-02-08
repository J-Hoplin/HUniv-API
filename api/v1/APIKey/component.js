const { v4 } = require('uuid');
const { APIKey } = require('../../../mongo/schema');
const {
    KeyAlreadyIssued,
    KeyNotIssuedYet,
} = require('../../../Exceptions').api.v1.APIKeyException;
const {
    newTokenIssued,
    issuedTokenRefreshed,
    mailSender,
} = require('../../../mail');
const {
    User,
} = require('../../../models');

const getExpireDate = () => {
    const now = new Date();
    const expireDate = new Date(
        now.setDate(now.getDate() + parseInt(process.env.API_KEY_EXPIRE, 10)),
    );
    return `${expireDate.getFullYear()}년 ${expireDate.getMonth() + 1}월 ${expireDate.getDate()}일`;
};

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
    const subject = 'New API token Issued!';
    const {
        id,
    } = req.decoded;
    const user = await APIKey.findOne({ userid: id });
    if (user) {
        throw new KeyAlreadyIssued();
    }
    const newToken = v4();
    const expireDate = getExpireDate();
    const { email } = await User.findOne({ where: { id }, raw: true });

    mailSender(process.env.MAIL_FROM, email, subject, newTokenIssued(expireDate, newToken))
        .then(() => {
            console.log(`Success to send mail to ${email}`);
        })
        .catch((err) => {
            console.log(`Fail to send mail to ${email}`);
            console.error(err);
        });
    await APIKey.create({
        userid: id,
        apikey: newToken,
    });
    return newToken;
};

exports.getRefreshedToken = async (req) => {
    const subject = 'Issued API token refreshed!';
    const {
        id,
    } = req.decoded;
    const checkUser = await APIKey.findOne({ userid: id });
    if (!checkUser) {
        throw new KeyNotIssuedYet();
    }
    await APIKey.deleteOne({ userid: id });
    const newToken = v4();
    const expireDate = getExpireDate();
    const { email } = await User.findOne({ where: { id }, raw: true });

    mailSender(process.env.MAIL_FROM, email, subject, issuedTokenRefreshed(expireDate, newToken))
        .then(() => {
            console.log(`Success to send mail to ${email}`);
        })
        .catch((err) => {
            console.log(`Fail to send mail to ${email}`);
            console.error(err);
        });

    await APIKey.create({
        userid: id,
        apikey: newToken,
    });
    return newToken;
};
