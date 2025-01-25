const express = require("express");
const apiRouter = require("./api");
const renderUrl = require("../controller/shortUrl/renderUrl");
const router = express.Router();


router.use('/api/v1', apiRouter)

router.get('/:shortId', renderUrl);

router.get('/', (req,res) =>{
  res.render("home")
})

router.use((req,res)=>{
  res.status(400).send("Page is not found")
})




module.exports = router;