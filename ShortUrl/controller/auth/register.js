const express = require("express");
const registerRouter = express.Router();

registerRouter.get('/register', (req,res)=>{
  res.send("register page")
})


module.exports = registerRouter;