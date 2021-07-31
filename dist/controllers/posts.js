"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Post = require("../models/post");

exports.createPost = function (req, res, next) {
  // const url = req.protocol + "://" + req.get("host");
  // console.log(url);
  var post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: req.file ? url + "/images/" + req.file.filename : null,
    creator: req.userData ? req.userData.userId : null,
    postStatus: req.body.postStatus
  });
  console.log(post);
  post.save().then(function (createdPost) {
    res.status(201).json({
      message: "post send successfully",
      post: _objectSpread({}, createdPost._doc),
      test: createdPost,
      postId: createdPost._id
    });
  });
};

exports.getPosts = function (req, res, next) {
  var pageSize = +req.query.pageSize;
  var currentPage = +req.query.page;
  var postQuery = Post.find({}).sort({
    updatedAt: -1
  });
  var fetchedpost;

  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  postQuery.then(function (docs) {
    fetchedpost = docs;
    return Post.countDocuments();
  }).then(function (count) {
    return res.status(200).json({
      message: "post fetched succesfully",
      posts: fetchedpost,
      maxCount: count
    });
  });
};

exports.getSinglePost = function (req, res, next) {
  findSinglePost(req.params.id, res);
};

exports.deletePost = function (req, res, next) {
  console.log(req.params.id);
  Post.deleteOne({
    _id: req.params.id,
    creator: req.userData ? req.userData.userId : null
  }).then(function (result) {
    if (result.n > 0) {
      res.status(200).json({
        message: "post deleted successfully",
        result: result
      });
    } else {
      res.status(401).json({
        message: "not authorized",
        result: result
      });
    }
  })["catch"](function (error) {
    res.status(400).json({
      message: error
    });
  });
};

exports.updatePost = function (req, res, next) {
  var imagePath = req.body.imagePath;

  if (req.file) {
    var _url = req.protocol + "://" + req.get("host");

    imagePath = _url + "/images/" + req.file.filename;
  }

  var post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    postStatus: req.body.postStatus
  });
  Post.updateOne({
    _id: req.params.id,
    creator: req.userData ? req.userData.userId : null
  }, post).then(function (result) {
    console.log(result);
    findSinglePost(req.params.id, res);
  });
};

function findSinglePost(id, res) {
  Post.findById(id).then(function (post) {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post not found!"
      });
    }
  });
}