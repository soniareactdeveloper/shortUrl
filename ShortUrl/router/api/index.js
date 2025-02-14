const express = require("express");
const authRouter = require("./auth");
const shortUrlRouter = require("./shortUrl");
const validateUser = require("../../middleware/authMiddleware");
const apiRouter = express.Router();

apiRouter.use('/auth', authRouter)

apiRouter.use('/genarate', validateUser, shortUrlRouter)


module.exports = apiRouter;
