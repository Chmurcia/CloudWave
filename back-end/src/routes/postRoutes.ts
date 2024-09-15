import { Router } from "express";
import {
  createPost,
  getPostById,
  getPosts,
  getPostsById,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";
const router = Router();

router.route("/").get(getPosts);
router
  .route("/post")
  .get(getPostById)
  .post(createPost)
  .put(updatePost)
  .delete(deletePost);
router.route("/posts-by-id").get(getPostsById);

export { router as postRouter };
// /api/posts/post
