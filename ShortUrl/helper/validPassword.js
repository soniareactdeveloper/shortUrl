// validatePassword.js
const validatePassword = (password) => {
  // Password must be at least 8 characters long, contain at least one letter, one number, and one special character
  const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  
  if (!passwordStrengthRegex.test(password)) {
    return false; 
  }
  return true; 
};

module.exports = validatePassword;
