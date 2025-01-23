const express = require("express");
const authRouter = require("./auth");
const shortUrlRouter = require("./shortUrl");
const apiRouter = express.Router();

apiRouter.use('/auth', authRouter)

apiRouter.use('/genarate', shortUrlRouter)


module.exports = apiRouter;
