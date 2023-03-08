const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoute = require("./Routes/authRoute")
app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("cache-control", "no-cache");
    res.setHeader("charset", "utf-8");
  
    next();
  });





app.use('/',authRoute)