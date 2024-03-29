import Post, { find, countDocuments, deleteOne, updateOne, findById } from "../models/post";
export function createPost(req, res, next) {
  // const url = req.protocol + "://" + req.get("host");
  // console.log(url);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: req.file ? url + "/images/" + req.file.filename : null,
    creator: req.userData ? req.userData.userId : null,
    postStatus: req.body.postStatus,
  });
  console.log(post);
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "post send successfully",
      post: { ...createdPost._doc },
      test: createdPost,
      postId: createdPost._id,
    });
  });
}

export function getPosts(req, res, next) {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = find({}).sort({ updatedAt: -1 });
  let fetchedpost;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((docs) => {
      fetchedpost = docs;
      return countDocuments();
    })
    .then((count) => {
      return res.status(200).json({
        message: "post fetched succesfully",
        posts: fetchedpost,
        maxCount: count,
      });
    });
}
export function getSinglePost(req, res, next) {
  findSinglePost(req.params.id, res);
}
export function deletePost(req, res, next) {
  console.log(req.params.id);
  deleteOne({
    _id: req.params.id,
    creator: req.userData ? req.userData.userId : null,
  })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({
          message: "post deleted successfully",
          result,
        });
      } else {
        res.status(401).json({
          message: "not authorized",
          result,
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        message: error,
      });
    });
}
export function updatePost(req, res, next) {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    postStatus: req.body.postStatus,
  });
  updateOne(
    { _id: req.params.id, creator: req.userData ? req.userData.userId : null },
    post
  ).then((result) => {
    console.log(result);
    findSinglePost(req.params.id, res);
  });
}

function findSinglePost(id, res) {
  findById(id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
}
