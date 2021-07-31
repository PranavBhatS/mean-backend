import { Router } from "express";
const router = Router();

import { createPost, getPosts, getSinglePost, deletePost, updatePost } from "../controllers/posts";
import checkAuth from "../middleware/check-auth";
import extractFile from "../middleware/file";
router.post("", createPost);
router.get("", getPosts);
router.get("/:id", getSinglePost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
export default router;
