const express = require("express");
const makeshortUrlRouter = require("../../controller/shortUrl/makeShortUrl");
const shortUrlRouter = express.Router();

shortUrlRouter.post('/shortUrl', makeshortUrlRouter)



module.exports = shortUrlRouter;