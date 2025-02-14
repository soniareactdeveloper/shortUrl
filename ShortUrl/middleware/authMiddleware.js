const jwt = require('jsonwebtoken');

const validateUser = (req, res, next) => {
  try {
    const token = req.cookies?.access_token; 

    if (token){
      jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if(err) {
          req.user = null;
          next();
        }
        if (decoded){
          req.user = decoded; 
          next();
          console.log(decoded);
          }
      });
    }else {
        next();
        req.user = null;
      }

  } catch (error) {
    return res.status(401).json({ error: "Internal Server Error" });
  }
};

module.exports = validateUser;
