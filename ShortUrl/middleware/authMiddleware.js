const jwt = require('jsonwebtoken');

const validateUser = (req, res, next) => {
  try {
    const token = req.cookies?.access_token; 

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    console.log(decoded);

    next(); 
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = validateUser;
