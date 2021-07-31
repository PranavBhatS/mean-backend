"use strict";

var path = require("path");

var express = require("express");

var bodyParser = require("body-parser");

var postsRoutes = require("./routes/posts");

var userRoutes = require('./routes/user');

var app = express();

var mongoose = require('mongoose');

var uri = "mongodb+srv://pranavsarang:pranav@123@cluster0.xezjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log('database connected');
})["catch"](function (err) {
  console.log('database error', err);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use("/images", express["static"](path.join("backend/images")));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Authorization

  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS,PUT");
  next();
});
app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);
module.exports = app;