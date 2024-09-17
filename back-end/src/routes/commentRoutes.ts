import { Router } from "express";
import {
  createComment,
  deleteComment,
  getCommentsByPostId,
  getCommentsByUserId,
} from "../controllers/commentController.js";
const router = Router();

router.route("/").post(createComment).delete(deleteComment);
router.route("/get-by-user-id").get(getCommentsByUserId);
router.route("/get-by-post-id").get(getCommentsByPostId);

export { router as commentRouter };
