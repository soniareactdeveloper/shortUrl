// validEmail.js
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const validateEmail = (email) => {
  if (!emailRegex.test(email)) {
    return false;
  }
  return true; 
};

module.exports = validateEmail;
