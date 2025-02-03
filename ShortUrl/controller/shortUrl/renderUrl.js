const shortUrlSchema = require("../../model/shortUrlSchema");

const renderUrl = async (req, res) =>{

  const  shortId  = req.params.shortId; 
 

 const existUrl = await shortUrlSchema.findOneAndUpdate(
  { shortId },
  { $push :{ visitedHistory:{ clickedAt: Date.now()}}},
  { new: true}
 );

 if (!existUrl) {
   return res.status(404).send("Page not found");
 }


  res.redirect(existUrl.url); 

}

const visitedHistory = async (req, res) => {
 const  shortId  = req.params.shortId; 
 

 const existUrl = await shortUrlSchema.findOne({shortId})

 if (!existUrl) {
   return res.status(404).send("ID not found");
 }


  res.send(existUrl); 

}

module.exports = {renderUrl, visitedHistory}; 