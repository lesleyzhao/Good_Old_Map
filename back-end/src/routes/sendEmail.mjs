import nodemailer from 'nodemailer';

const sendRecoveryEmail = async (email, token) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 587, 
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'goodoldmap@gmail.com',
      pass: 'ebro wnec snzf fcqt',
    },
  });

  let mailOptions = {
    from: '"The GoodOldMap" <goodoldmap@gmail.com>', // Your verified sender email address
    to: email, // Receiver email
    subject: 'Password Recovery', // Subject line
    text: `Please use the following token to recover your password in 1h: ${token}`, // Plain text body
    html: `<b>Please use the following token to recover your password:</b> ${token}`, // HTML body
  };

  // Send the email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendRecoveryEmail;
