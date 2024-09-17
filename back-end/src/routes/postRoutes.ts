import { Router } from "express";
import {
  createPost,
  getPostById,
  getPosts,
  getPostsById,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";
import {
  createPostLike,
  deletePostLike,
  getPostLikeByPostId,
  getPostLikeByUserId,
} from "../controllers/postLikesController.js";
const router = Router();

router.route("/").get(getPosts);
router
  .route("/post")
  .post(createPost)
  .get(getPostById)
  .put(updatePost)
  .delete(deletePost);
router.route("/get-by-id").get(getPostsById);

router.route("/like").post(createPostLike).delete(deletePostLike);
router.route("/like/get-by-user-id").get(getPostLikeByUserId);
router.route("/like/get-by-post-id").get(getPostLikeByPostId);

export { router as postRouter };
// /api/posts/
