const express = require("express");
const apiRouter = require("./api");
const renderUrl = require("../controller/shortUrl/renderUrl");
const homePage = require("./staticSites");
const router = express.Router();


router.use('/api/v1', apiRouter)

router.get('/:shortId', renderUrl);

router.use('/', homePage)

router.use((req,res)=>{
  res.status(400).send("Page is not found")
})




module.exports = router;