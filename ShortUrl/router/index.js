const express = require("express");
const apiRouter = require("./api");
const router = express.Router();


router.use('/api/v1', apiRouter)


router.use((req,res)=>{
  res.status(400).send("Page is not found")
})




module.exports = router;