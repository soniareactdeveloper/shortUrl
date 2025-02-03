const express = require("express");
const apiRouter = require("./api");
const homePage = require("./staticSites");
const { renderUrl, visitedHistory } = require("../controller/shortUrl/renderUrl");
const router = express.Router();


router.use('/api/v1', apiRouter)
router.get('/:shortId', renderUrl);
router.get('/visitedhistory/:shortId', visitedHistory);
router.use('/', homePage)

router.use((req,res)=>{
  res.status(400).send("Page is not found")
})




module.exports = router;