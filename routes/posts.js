const express = require('express');
const router = express.Router();

const PostControler = require("../controllers/posts")
const checkAuth = require("../middleware/check-auth")
const extractFile = require("../middleware/file")
router.post("", checkAuth, extractFile, PostControler.createPost)
router.get("", PostControler.getPosts);
router.get("/:id", PostControler.getSinglePost);
router.delete('/:id', checkAuth, PostControler.deletePost)
router.put('/:id', checkAuth, extractFile, PostControler.updatePost)
module.exports = router;