const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const shortUrlSchema = new Schema({
  url : {
    type: String,
    required : true
  },
  shortId : {
    type:String
  },
  visitedHistory : [
    {
      clickedAt : {
        type: Date,
      }
    }
  ]
});


module.exports = mongoose.model('shortUrl', shortUrlSchema);