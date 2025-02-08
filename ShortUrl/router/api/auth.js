const express = require("express");
const authRouter = express.Router();
const register = require("../../controller/auth/register");
const login = require("../../controller/auth/login");


authRouter.use('/login',login)

authRouter.use('/register', register)


module.exports = authRouter;