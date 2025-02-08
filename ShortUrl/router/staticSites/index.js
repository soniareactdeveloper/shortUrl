const homePage = (req, res) => {
  res.render('home');
};

const loginPage = (req, res) => {
  res.render('login');
};

const registerPage = (req, res) => {
  res.render('register');
};

module.exports = { homePage, loginPage, registerPage };
