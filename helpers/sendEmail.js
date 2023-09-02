const nodemailer = require('nodemailer');

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async data => {
  const email = { ...data, from: SENDER_EMAIL };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
