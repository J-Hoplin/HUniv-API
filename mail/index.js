const mailer = require('nodemailer');
const config = require('../config/mail-config.json');
const format = require('./format');

const officer = mailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.username,
        pass: config.password,
    },
});

const mailSender = async (from, to, subject, html) => {
    console.log(config.username);
    await officer.sendMail({
        from,
        to,
        subject,
        html,
    });
};

module.exports = {
    mailSender,
    ...format,
};
