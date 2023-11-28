import User from '../models/User.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendRecoveryEmail from './sendEmail.mjs'; // Your email sending function

const forgetpasswordRouter = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a token for password reset
    const resetToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    // Store the token in the database (you'll need to implement this logic)
    // E.g., user.resetToken = resetToken; await user.save();

    // Send the token to the user's email
    await sendRecoveryEmail(email, resetToken);

    return res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default forgetpasswordRouter;

// const forgetpasswordRouter = async (req, res) => {
//   // req.body: email, userID
//   // TODO: compare email to see if that match,
//   // if match, send recovery data to email
//   try {
//     return res.sendStatus(200)
//   } catch (error) {
//   }
// }

// export default forgetpasswordRouter