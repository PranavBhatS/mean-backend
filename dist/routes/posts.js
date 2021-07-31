"use strict";

var express = require("express");

var router = express.Router();

var PostControler = require("../controllers/posts");

var checkAuth = require("../middleware/check-auth");

var extractFile = require("../middleware/file");

router.post("", PostControler.createPost);
router.get("", PostControler.getPosts);
router.get("/:id", PostControler.getSinglePost);
router["delete"]("/:id", PostControler.deletePost);
router.put("/:id", PostControler.updatePost);
module.exports = router;