"use strict";

var bcrypt = require("bcryptjs");

var User = require("../models/user");

var jwt = require("jsonwebtoken");

exports.createUser = function (req, res, next) {
  bcrypt.hash(req.body.password, 10).then(function (hash) {
    var user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(function (result) {
      res.status(201).json({
        message: "User created",
        result: result
      });
    })["catch"](function (err) {
      res.status(500).json({
        error: err,
        message: "signup failed"
      });
    });
  });
};

exports.userLogin = function (req, res, next) {
  var fetchedUser;
  User.findOne({
    email: req.body.email
  }).then(function (user) {
    if (!user) {
      return res.status(401).json({
        message: "auth failed"
      });
    }

    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(function (result) {
    if (!result) {
      return res.status(401).json({
        message: "auth failed"
      });
    }

    var token = jwt.sign({
      email: fetchedUser.email,
      userId: fetchedUser._id
    }, process.env.JWT_KEY, {
      expiresIn: '1h'
    });
    res.status(200).json({
      message: "log in successfully",
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  })["catch"](function (err) {
    return res.status(401).json({
      message: "auth failed"
    });
  });
};