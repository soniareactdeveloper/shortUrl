const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  shortUrl : {
    ref: 'shortUrl',
    type: [Schema.Types.ObjectId],
  }
});


module.exports = mongoose.model('user', registrationSchema);
