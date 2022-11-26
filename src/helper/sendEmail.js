const nodemailer = require("nodemailer");
const handlebars = require("nodemailer-express-handlebars");
const path = require("path");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  secureConnection: false, // TLS requires secureConnection to be false
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

module.exports = {
  sendConfirmationEmail: (email, confirmationCode, name) => {
    transport.use(
      "compile",
      handlebars({
        viewEngine: {
          extname: ".html",
          partialsDir: path.resolve("./src/template/email/confirmation"),
          defaultLayout: false,
        },
        viewPath: path.resolve("./src/template/email/confirmation"),
        extName: ".html",
      })
    );
    const mailOptions = {
      from: '"Telegrams" <admin@telegrams.co.id>',
      to: email,
      subject: "Please Confirm Your Account",
      text: "Confirm Your telegrams account",
      template: "confirm-email",
      context: {
        url: `${process.env.APP_URL}/auth/verify-email?token=${confirmationCode}`,
        name: `${name}`,
      },
    };

    transport.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  },
};
