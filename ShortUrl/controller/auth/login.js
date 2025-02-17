const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateEmail = require("../../helper/validEmail");
const validatePassword = require("../../helper/validPassword");
const registrationSchema = require("../../model/registrationSchema");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password format
    if (!validatePassword(password)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long, contain at least one letter, one number, and one special character",
      });
    }

    // Check if the email exists
    const existingUser = await registrationSchema.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Exclude the password field
    const loggedUser = {
      id: existingUser._id,
      email: existingUser.email,
      UserName: existingUser.UserName
    };

    // Set cookie and send response
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "Strict",
    });
    // Redirect to home page 
    res.redirect('/');

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = login;
