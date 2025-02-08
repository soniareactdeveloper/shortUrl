// validEmail.js
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const validateEmail = (email) => {
  if (!emailRegex.test(email)) {
    return false; // Return false if the email is invalid
  }
  return true; // Return true if the email is valid
};

module.exports = validateEmail;
