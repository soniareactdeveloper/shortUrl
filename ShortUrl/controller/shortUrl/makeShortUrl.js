const express = require("express");
const isUrlValid = require("../../helper/isUrlValid");
const shortUrlSchema = require("../../model/shortUrlSchema");
const generateRandomShortId = require("../../helper/generateShortId");
const registrationSchema = require("../../model/registrationSchema");

const makeshortUrlRouter = async (req, res) => {
  const { url } = req.body;

  // Validate input
  if (!url) {
    return res.render("home", { error: "URL is required!" });
  }

  if (!isUrlValid(url)) {
    return res.render("home", { error: "URL is not Valid!" });
  }

  // Generate a valid short ID
  let shorted;
  do {
    shorted = generateRandomShortId(url);
  } while (shorted.includes("/"));

  try {
    let existUrl = await shortUrlSchema.findOne({ url });

    if (!existUrl) {
      existUrl = await shortUrlSchema.create({
        url,
        shortId: shorted,
        isAuth: req.user ? true : false, 
        loggedUser: req.user,
      });

      if (req.user) {
        await registrationSchema.findByIdAndUpdate(req.user.userId, {
          $push: { shortUrl: existUrl._id },
          loggedUser: req.user,
        });
      }
    } else {
      existUrl = await shortUrlSchema.findOneAndUpdate(
        { url },
        { $set: { shortId: shorted, isAuth: req.user ? true : existUrl.isAuth } },
        { new: true }
      );

      // do not show visited history without authentication
      if (req.user) {
        await registrationSchema.findByIdAndUpdate(req.user.userId, {
          $addToSet: { shortUrl: existUrl._id },
        });
      }
    }


    return res.render("home", {
      message: "Short URL created successfully!",
      longUrl: existUrl.url,
      shortUrl: `http://localhost:8080/${existUrl.shortId}`,
    });
  } catch (error) {
    return res.render("home", {
      error: "An error occurred while processing your request.",
    });
  }
  
};

module.exports = makeshortUrlRouter;
   