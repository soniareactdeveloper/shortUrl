const homePage = (req, res) => {
  res.render('home',{
    loggedUser: req.user,
  });
};

const loginPage = (req, res) => {
  res.render('login');
};

const registerPage = (req, res) => {
  res.render('register');
};

module.exports = { homePage, loginPage, registerPage };
