import nodemailer from 'nodemailer';

const sendRecoveryEmail = async (email, token) => {
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.example.com', 
    port: 587, 
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'your-email@example.com', // Your email
      pass: 'your-password', // Your email password or app-specific password
    },
  });

  let mailOptions = {
    from: '"Your App Name" <your-email@example.com>', // Sender address
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
