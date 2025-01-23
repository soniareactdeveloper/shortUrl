const express = require("express");
const isUrlValid = require("../../helper/isUrlValid");
const generateRandomShortId = require("./generateShortId");
const shortUrlSchema = require("../../model/shortUrlSchema");


const makeshortUrlRouter = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send({ error: "URL is required" });
  }

  if (!isUrlValid(url)) {
    return res.status(400).send({ error: "URL is not valid" });
  }

  // Generate the short ID
  const shorted = generateRandomShortId(url);

   // Validate that the short ID doesn't contain a slash
   while (shorted.includes('/')) {
     shorted = generateRandomShortId(url);
   }

    // Find and update the document, or insert if it doesn't exist
    const existUrl = await shortUrlSchema.findOneAndUpdate(
      { url }, 
      { $set: { shortId: shorted } },
      { new: true, upsert: true }
    );

   if(existUrl){
     return res.send(existUrl)
   }

  //  sending date to the mongodb
   const shortUrl = new shortUrlSchema({
    url: url,
    shortId:shorted
   });
   shortUrl.save()

   
  res.send({existUrl});
};

module.exports = makeshortUrlRouter;
