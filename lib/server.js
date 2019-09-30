const express = require('express');
// const session = require('express-session');
const bodyParser = require('body-parser');
// const dbUri = require('./private/keys').MongoUri;
var MongoClient = require('mongoose');
const app = express();

// Body Parser  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB Connection
MongoClient.connect("mongodb://localhost:27017/egm", { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected: Admin'))
  .catch(err => console.log(err));

// CORS Configs
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  })

//Headers
app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store');
    next();
  });
// Root Route Config
app.use('/', require('./routes/paths'));

// Port Configs
const PORT = process.env.PORT || 2020;
app.listen(PORT, console.log(`Server started on port ${PORT}`));