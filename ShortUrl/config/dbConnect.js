const mongoose = require('mongoose');


const dbConnect = ()=>{
  mongoose.connect(process.env.DB_url)
    .then(() => console.log('DB Connected!'));

}

module.exports = dbConnect;

