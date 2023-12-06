import User from '../models/User.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendRecoveryEmail from './sendEmail.mjs';

const forgetpasswordRouter = async (req, res) => {
  const { email } = req.body;

  console.log("Received forgot password request for email:", email);

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log("User found:", user);

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found." });
    }

    const resetToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Store the reset token in the user's record in the database
    user.resetToken = resetToken;
    await user.save();

    await sendRecoveryEmail(email, resetToken);
    console.log("Password reset email sent to:", email);

    return res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error("Error in /forgotpassword route:", error);
    return res.status(500).json({ message: "Internal server error." });
  }

  
};

export default forgetpasswordRouter;
