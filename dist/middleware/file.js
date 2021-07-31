"use strict";

var multer = require("multer");

var MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    var isValid = MIME_TYPE_MAP[file.mimetype];
    var error = new Error("Invalid mime type");

    if (isValid) {
      error = null;
    }

    console.log(error, "pranav");
    cb(error, "backend/images");
  },
  filename: function filename(req, file, cb) {
    var name = file.originalname.toLowerCase().split(" ").join("-");
    var ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});
module.exports = multer({
  storage: storage
}).single("image");