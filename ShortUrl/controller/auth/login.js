const express = require("express");
const loginRouter = express.Router();

loginRouter.get('/login', (req,res)=>{
  res.send("login page")
})


module.exports = loginRouter;