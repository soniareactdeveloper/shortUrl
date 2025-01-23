const express = require('express');
const dbConnect = require('./config/dbConnect');
const router = require('./router');
const app = express();
dbConnect()
app.use(express.json());
app.use(router)








app.listen(8080, ()=>{
  console.log("server is running on the port 8080");
})


