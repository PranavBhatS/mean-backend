"use strict";

var express = require('express');

var UserController = require("../controllers/user");

var bcrypt = require("bcryptjs");

var User = require("../models/user");

var jwt = require("jsonwebtoken");

var router = express.Router();
router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
module.exports = router;