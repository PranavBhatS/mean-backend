const Post = require('../models/post');
exports.createPost = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    console.log(url)
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
    });
    console.log(post);
    post.save().then(createdPost => {
        res.status(201).json({
            message: "post send successfully",
            post: { ...createdPost },
            postId: createdPost._id
        });
    });

}

exports.getPosts = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedpost;
    if (pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQuery
        .then((docs) => {
            fetchedpost = docs
            return Post.countDocuments();
        })
        .then(count => {
            return res.status(200).json({
                message: "post fetched succesfully",
                posts: fetchedpost,
                maxCount: count
            });
        })
}
exports.getSinglePost = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
}
exports.deletePost = (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({
        _id: req.params.id, creator: req.userData.userId
    }).then(result => {
        if (result.n > 0) {
            res.status(200).json({
                message: "post deleted successfully",
                result
            })
        } else {
            res.status(401).json({
                message: "not authorized",
                result
            })
        }
    })
        .catch(error => {
            res.status(400).json({
                message: error
            })
        })
}
exports.updatePost = (req, res, next) => {
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
    })
    Post.updateOne(
        { _id: req.params.id, creator: req.userData.userId },
        post
    ).then(result => {
        if (result.n > 0) {
            res.status(200).json({
                message: "post update successfully",
                result
            })
        } else {
            res.status(401).json({
                message: "not authorized",
                result
            })
        }

    })
}