// import nodemailer from 'nodemailer';


// const sendRecoveryEmail = async (email, token) => {
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com', // Gmail SMTP server
//     port: 587, 
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'goodoldmap@gmail.com',
//       pass: 'ebro wnec snzf fcqt',
//     },
//   });

//   let mailOptions = {
//     from: '"The GoodOldMap" <goodoldmap@gmail.com>', // Your verified sender email address
//     to: email, // Receiver email
//     subject: 'Password Recovery', // Subject line
//     text: `Please use the following token to recover your password in 1h: ${token}`, // Plain text body
//     html: `<b>Please use the following token to recover your password:</b> ${token}`, // HTML body
//   };

//   // Send the email
//   try {
//     let info = await transporter.sendMail(mailOptions);
//     console.log('Message sent: %s', info.messageId);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

// export default sendRecoveryEmail;



import nodemailer from 'nodemailer';

const sendRecoveryEmail = async (email, token) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'goodoldmap@gmail.com',
      pass: 'ebro wnec snzf fcqt',
    },
  });

  // The URL to your password reset page in your frontend app
  // Replace 'your-frontend-domain.com' with your actual domain and adjust the path as needed
  const resetUrl = `http://localhost:3000/resetpassword?token=${token}`;

  let mailOptions = {
    from: '"The GoodOldMap" <goodoldmap@gmail.com>',
    to: email,
    subject: 'Password Recovery',
    text: `Please click the following link to reset your password (valid for 1 hour): ${resetUrl}`,
    html: `<p>Please click the following link to reset your password (valid for 1 hour):</p>
           <a href="${resetUrl}">${resetUrl}</a>`
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export default sendRecoveryEmail;
