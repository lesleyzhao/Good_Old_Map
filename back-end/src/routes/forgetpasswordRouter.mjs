import jwt from 'jsonwebtoken';
import sendRecoveryEmail from './sendEmail.mjs';
import axios from 'axios';

const axiosMongoDB = axios.create({
  baseURL: process.env.MONGODB_DATA_API,
  headers: {
    'Content-Type': 'application/json',
    'api-key': process.env.MONGODB_API_KEY
  }
});

const forgetpasswordRouter = async (req, res) => {
  const { email } = req.body;

  console.log("Received forgot password request for email:", email);

  try {
    // const user = await User.findOne({ email: email.toLowerCase() });
    const response = await axiosMongoDB.post('/action/find', {
      collection: 'users',
      database: 'bakerdb',
      dataSource: 'bakerdb',
      filter: { email: email.toLowerCase() }
    });
    const user = response.data.documents[0];
    console.log("User found:", user);

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found." });
    }

    const resetToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Store the reset token in the user's record in the database
    // user.resetToken = resetToken;
    // await user.save();
    await axiosMongoDB.post('/action/updateOne', {
      collection: 'users',
      database: 'bakerdb',
      dataSource: 'bakerdb',
      filter: { _id: user._id },
      update: { $set: { resetToken: resetToken } }
    });

    await sendRecoveryEmail(email, resetToken);
    console.log("Password reset email sent to:", email);

    return res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error("Error in /forgotpassword route:", error);
    return res.status(500).json({ message: "Internal server error." });
  }

  
};

export default forgetpasswordRouter;
