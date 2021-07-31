"use strict";

var jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(" ")[1];
    var decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId
    };
    next();
  } catch (error) {
    res.status(401).json({
      message: "Auth failed"
    });
  }
};