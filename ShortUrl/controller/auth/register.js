const validateEmail = require("../../helper/validEmail");
const validatePassword = require("../../helper/validPassword");
const registrationSchema = require("../../model/registrationSchema");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const { UserName, email, password } = req.body;

    // Validate that all fields are provided
    if (!UserName) {
      return res.status(400).json({ error: "Username is required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Validate email format using the helper function
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password using the helper function
    if (!validatePassword(password)) {
      return res.status(400).json({ error: "Password must be at least 8 characters long, contain at least one letter, one number, and one special character" });
    }
     
    // Check if the email is already registered
    const existingUser = await registrationSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user with the hashed password
    const user = new registrationSchema({ 
      UserName, 
      email, 
      password: hashedPassword  
    });

    await user.save();

    res.status(201).json({ message: "Registration successful" });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = register;
