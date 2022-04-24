const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const transport = require('nodemailer-sendgrid-transport');

const sendMail = async (options) => {
  // 1 Create Transportor
//   const transporter = nodeMailer.createTransport({
//     service: 'SendGrid',
//     auth: {
//       user: process.env.Sendgrid_Username,
//       pass: process.env.Sendgrid_Password,
//     },
//   });


const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.Email_From,
    pass: process.env.GMAIL_PASSWORD,
  }
});

// let transporter = nodeMailer.createTransport({
//   service: 'Gmail',
//   auth: {
//       type: 'OAuth2',
//       user: 'abdulbasitdamilola6@gmail.com',
//       clientId: '814581352433-bjdd3hi66cdmadulg0mk6hlodcsgp4s6.apps.googleusercontent.com',
//       clientSecret: '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',
//       refreshToken: "1//038rmJaWwDewACgYIARAAGAMSNwF-L9IrihG2Wz4JOvqOS9nwOM5mzUlb0pL2hQckQn93uQ4qn4zlWH06qD3H2j5QhqT4tq2zAMg",
//       accessToken: "ya29.A0ARrdaM-s6-CAoKiyqabfsNvRlmsR8Obpbxrn0sp6LHEYqTPiHY2wtlLUc1gzp9L6HkbNSvi9zp8YyhrxIw1zsQxkCWbqClElIp0hx-EIf5wzUsNq5UN3eBaMfjFi076cQzQhMVjlU2n14RQ9scXo91vxXO-d",
//       expires: 1650543704882
//   }
// });
// {


// console.log("MAIL", process.env.MAILCHIMP_KEY)
// const transporter = nodeMailer.createTransport({
//   host: "smtp.mandrillapp.com",
//   port: 587,
//   secure: false, // upgrade later with STARTTLS
//   auth: {
//     user: "FYP project",
//     pass: process.env.MAILCHIMP_KEY,
//   },
// });
// const transporter = nodeMailer.createTransport(transport({
//   name: "localhost:3000",
//     auth: {
//         api_key: process.env.SENDGRID_KEY,
//     }
// }));
  // 2 Render HTML Based on ejs template
  const html = await ejs.renderFile(
    `${__dirname}/email.ejs`,
    {
      user: options.user,
      url: options.url,
    }
  );

  // console.log(html);

  // 3 Define Mail Options
  const mailOptions = {
    from: process.env.Email_From,
    to: options.email,
    subject: options.subject,
    // text: htmlToText.fromString(html),
    html,
  };

  // 4 Send Email
 let r =  await transporter.sendMail(mailOptions);
console.log(r);
};

module.exports = sendMail;
