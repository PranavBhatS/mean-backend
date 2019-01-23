const express = require('express');
const UserController = require("../controllers/user")
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken")



const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);

module.exports = router;