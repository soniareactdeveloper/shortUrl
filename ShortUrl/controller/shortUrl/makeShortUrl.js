const express = require("express");
const isUrlValid = require("../../helper/isUrlValid");
const shortUrlSchema = require("../../model/shortUrlSchema");
const generateRandomShortId = require("../../helper/generateShortId");


const makeshortUrlRouter = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.render("home", {
      error: "URL is required!",
     })
  }

  if (!isUrlValid(url)) {
    return res.render("home", {
      error: "URL is not Valid!",
     })
  }

  // // Generate the short ID
  let shorted = generateRandomShortId(url);

   // Validate that the short ID doesn't contain a slash
   while (shorted.includes('/')) {
     shorted = generateRandomShortId(url);
   }

    // Find and update the document, or insert if it doesn't exist
    const existUrl = await shortUrlSchema.findOneAndUpdate(
      { url }, 
      { $set: { shortId: shorted } },
      { new: true}
    );

    if(existUrl){
      return res.render("home", {
        message: "Short Url created successfully!",
        longUrl: existUrl.url,
        shortUrl: `http://localhost:8080/${existUrl.shortId}`
       })
  
    }
  //  sending date to the mongodb
   const shortUrl = new shortUrlSchema({
    url: url,
    shortId: shorted
   });
   shortUrl.save()

   res.render("home", {
    message: "Short Url created successfully!",
    longUrl: shortUrl.url,
    shortUrl: `http://localhost:8080/${shortUrl.shortId}`
   })
};

module.exports = makeshortUrlRouter;
