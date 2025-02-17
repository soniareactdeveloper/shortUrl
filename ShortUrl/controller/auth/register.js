const validateEmail = require("../../helper/validEmail");
const validatePassword = require("../../helper/validPassword");
const registrationSchema = require("../../model/registrationSchema");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    // Validate email 
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password 
    if (!validatePassword(password)) {
      return res.status(400).json({ error: "Password must be at least 8 characters long, contain at least one letter, one number, and one special character" });
    }
     
    // email is registered
    const existingUser = await registrationSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new registrationSchema({ 
      username, 
      email, 
      password: hashedPassword  
    });

    await user.save();

    res.redirect("/login");

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = register;
