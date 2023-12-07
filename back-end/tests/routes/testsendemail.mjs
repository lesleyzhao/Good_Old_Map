import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const testEmailSending = async () => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'goodoldmap@gmail.com',
      pass: 'ebro wnec snzf fcqt', // Use environment variables to keep this secure
    },
  });

  let mailOptions = {
    from: `"The GoodOldMap" <${process.env.EMAIL_USER}>`,
    to: 'rm5592@nyu.edu', // Replace with your test recipient email
    subject: 'Test Email',
    text: 'This is a test email from my Node.js application.',
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

testEmailSending();
