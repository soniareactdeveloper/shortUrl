const express = require("express");
const isUrlValid = require("../../helper/isUrlValid");
const shortUrlSchema = require("../../model/shortUrlSchema");
const generateRandomShortId = require("../../helper/generateShortId");
const registrationSchema = require("../../model/registrationSchema");

const makeshortUrlRouter = async (req, res) => {
  const { url } = req.body;

  // Check if URL is provided
  if (!url) {
    return res.render("home", {
      error: "URL is required!",
    });
  }

  // Validate URL
  if (!isUrlValid(url)) {
    return res.render("home", {
      error: "URL is not Valid!",
    });
  }

  // Generate the short ID
  let shorted = generateRandomShortId(url);

  // Ensure short ID doesn't contain a slash
  while (shorted.includes("/")) {
    shorted = generateRandomShortId(url);
  }

  // Check if the user is logged in
  if (req.user) {
    try {
      // Check if the URL already exists and update or create a new one
      let existUrl = await shortUrlSchema.findOneAndUpdate(
        { url },
        { $set: { shortId: shorted } },
        { new: true }
      );

      // If the URL doesn't exist, create a new one
      if (!existUrl) {
        const shortUrl = new shortUrlSchema({
          url,
          shortId: shorted,
        });

        // Save the new short URL
        await shortUrl.save();

        // Push the short URL reference into the user's shortUrl array in registrationSchema
        await registrationSchema.findByIdAndUpdate(
          req.user.userId,
          { $push: { shortUrl: shortUrl._id } }
        );

        existUrl = shortUrl;
      } else {
        // Update the user's shortUrl array in registrationSchema if it exists
        await registrationSchema.findByIdAndUpdate(
          req.user.userId,
          { $push: { shortUrl: existUrl._id } }
        );
      }

      return res.render("home", {
        message: "Short Url created successfully!",
        longUrl: existUrl.url,
        shortUrl: `http://localhost:8080/${existUrl.shortId}`,
      });
    } catch (error) {
      return res.render("home", {
        error: "An error occurred while processing your request.",
      });
    }
  } else {
    try {
      // Handle the case when the user is not logged in (non-user route)
      let existUrl = await shortUrlSchema.findOneAndUpdate(
        { url },
        { $set: { shortId: shorted } },
        { new: true }
      );

      if (!existUrl) {
        const shortUrl = new shortUrlSchema({
          url,
          shortId: shorted,
        });

        await shortUrl.save();

        return res.render("home", {
          message: "Short Url created successfully!",
          longUrl: shortUrl.url,
          shortUrl: `http://localhost:8080/${shortUrl.shortId}`,
        });
      } else {
        return res.render("home", {
          message: "Short Url created successfully!",
          longUrl: existUrl.url,
          shortUrl: `http://localhost:8080/${existUrl.shortId}`,
        });
      }
    } catch (error) {
      return res.render("home", {
        error: "An error occurred while processing your request.",
      });
    }
  }
};

module.exports = makeshortUrlRouter;
