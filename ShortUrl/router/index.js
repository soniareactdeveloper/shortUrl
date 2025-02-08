const express = require("express");
const apiRouter = require("./api");
const { homePage, loginPage, registerPage } = require("./staticSites");
const { renderUrl, visitedHistory } = require("../controller/shortUrl/renderUrl");
const router = express.Router();

// API routes
router.use(process.env.BASE_API_URL, apiRouter);

// View routes
router.get('/', homePage);

router.get('/login', loginPage);

router.get('/register', registerPage);

// Short URL routes
router.get('/visitedhistory/:shortId', visitedHistory);
router.get('/:shortId', renderUrl);

// Handle 404 errors
router.use((req, res) => {
  res.status(404).render('error');
});

module.exports = router;
