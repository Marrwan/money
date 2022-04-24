require('dotenv').config();

const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_KEY,
  server: process.env.mailchimpInstance,
});

// async function run() {
//   const response = await mailchimp.ping.get();
//   console.log(response);
// }

// run();
const message = {
    from_email: "abdulbasitdamilola@gmail.com",
    subject: "Hello world",
    text: "Welcome to Mailchimp Transactional!",
    to: [
      {
        email: "abdulbasitdamilola6@gmail.com",
        type: "to"
      }
    ]
  };
  console.dir(mailchimp)
//   async function run() {
//     const response = await mailchimp.send({
//       message
//     });
//     console.log(response);
//   }
//   run();