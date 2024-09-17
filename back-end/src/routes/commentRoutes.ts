import { Router } from "express";
import {
  createComment,
  deleteComment,
  getCommentsByPostId,
  getCommentsByUserId,
} from "../controllers/commentController.js";
import {
  createCommentLike,
  deleteCommentLike,
  getCommentLikesByCommentId,
  getCommentLikesByUserId,
} from "../controllers/commentLikesController.js";
const router = Router();

router.route("/").post(createComment).delete(deleteComment);
router.route("/get-by-user-id").get(getCommentsByUserId);
router.route("/get-by-post-id").get(getCommentsByPostId);

router.route("/like").post(createCommentLike).delete(deleteCommentLike);
router.route("/like/get-by-user-id").get(getCommentLikesByUserId);
router.route("/like/get-by-comment-id").get(getCommentLikesByCommentId);
export { router as commentRouter };
