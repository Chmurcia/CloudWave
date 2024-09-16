import { Router } from "express";
import {
  createFriendRequest,
  getFriendRequestsById,
  deleteFriendRequest,
} from "../controllers/friendRequestController.js";
const router = Router();

router.route("/request").post(createFriendRequest).delete(deleteFriendRequest);
router.route("/requests-by-id").get(getFriendRequestsById);

export { router as friendRouter };
// /api/friends/request
