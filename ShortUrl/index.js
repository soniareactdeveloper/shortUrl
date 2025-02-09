const express = require('express');
require('dotenv').config()
const dbConnect = require('./config/dbConnect');
var cookieParser = require('cookie-parser')
const router = require('./router');
const app = express();
app.set('view engine', 'ejs')
dbConnect()
app.use(cookieParser())
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.use(router)







app.listen(8080, ()=>{
  console.log("server is running on the port 8080");
})


