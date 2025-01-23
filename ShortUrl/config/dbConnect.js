const mongoose = require('mongoose');


const dbConnect = ()=>{
  mongoose.connect('mongodb+srv://nodewithdb:cYusZ98WnsvzXTCY@cluster0.68lfj.mongodb.net/shortUrl?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DB Connected!'));

}

module.exports = dbConnect;

