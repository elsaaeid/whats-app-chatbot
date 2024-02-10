const twilio = require('twilio');
const asyncHandler = require("express-async-handler");

const chatBot = asyncHandler(async (req, res) => {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, 
        process.env.TWILIO_AUTH_TOKEN);
   
    const body = req.body.Body;
   
    if (body.toLowerCase() === 'hello') {
       client.messages
         .create({
           body: 'Hello! I am your chatbot.',
           from: process.env.TWILIO_PHONE_NUMBER,
           to: "+201028496209",
         })
         .then(() => {
           res.status(200).send('Message sent successfully');
         })
         .catch((error) => {
           console.error(error);
           res.status(500).send('Failed to send message');
         });
    } else {
       res.status(200).send('Invalid message');
    }
   });
  
  module.exports = {
    chatBot
  };
  