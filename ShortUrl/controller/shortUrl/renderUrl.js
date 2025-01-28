const shortUrlSchema = require("../../model/shortUrlSchema");

const renderUrl = async (req, res) =>{

  const  shortId  = req.params.shortId; 
 

 const existUrl = await shortUrlSchema.findOne({ shortId });

 if (!existUrl) {
   return res.status(404).send("Page not found");
 }


  res.redirect(existUrl.url); 

}

module.exports = renderUrl; 