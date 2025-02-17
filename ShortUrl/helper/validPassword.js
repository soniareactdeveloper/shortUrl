// validatePassword.js
const validatePassword = (password) => {
  const passwordStrengthRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  
  if (!passwordStrengthRegex.test(password)) {
    return false; 
  }
  return true; 
};

module.exports = validatePassword;
