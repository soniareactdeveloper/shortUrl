const express = require("express");
const loginRouter = require("../../controller/auth/login");
const registerRouter = require("../../controller/auth/register");
const authRouter = express.Router();

authRouter.use('/loginRouter', loginRouter)

authRouter.use('/registerRouter', registerRouter)


module.exports = authRouter;