const express = require("express");
const makeshortUrlRouter = require("../../controller/shortUrl/makeShortUrl");
const shortUrlRouter = express.Router();

shortUrlRouter.use('/shortUrlRouter', makeshortUrlRouter)



module.exports = shortUrlRouter;