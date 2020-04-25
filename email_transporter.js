if (process.env.NODE_ENV === 'production') {
    const requestPromise = require('request-promise');
    module.exports = {
        sendMail : async function(data) {
            await requestPromise({
                method: 'POST',
                uri: `https://api.mailgun.net/v3/${process.env.MAILGUN_SENDER_DOMAIN}/messages`,
                auth: {
                    user: 'api',
                    pass: process.env.MAILGUN_API_KEY,
                },
                formData: data,
            });
        },
    };
} else {
    // Use a fake email address from Ethereal Mail
    const nodemailer = require('nodemailer');
    mailConfig = {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.ETHEREAL_MAIL_ADDRESS,
            pass: process.env.ETHEREAL_MAIL_PASSWORD,
        },
    };

    module.exports = nodemailer.createTransport(mailConfig);
}