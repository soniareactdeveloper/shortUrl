const shortUrlSchema = require("../../model/shortUrlSchema");

const renderUrl = async (req, res) =>{

  const  shortId  = req.params.shortId; 
 

 const existUrl = await shortUrlSchema.findOne(
  { shortId }
 );

 if (!existUrl) {
   return res.render("error", {error: "Oops! The page you are looking for does not exist."})
 }
  
 if (existUrl.isAuth){
    const url =  await shortUrlSchema.findByIdAndUpdate(
        existUrl._id,
        { $push :{ visitedHistory:{ clickedAt: Date.now()}}},
        { new: true}
      );

    res.redirect(url.url); 
 } else {
  res.redirect(existUrl.url); 
 }


}

module.exports = {renderUrl}; 