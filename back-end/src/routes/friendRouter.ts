import { Router } from "express";
import {
  createFriendRequest,
  getFriendRequestsById,
  deleteFriendRequest,
} from "../controllers/friendRequestController.js";
import {
  createFriend,
  deleteFriend,
  getFriendsById,
} from "../controllers/friendControllers.js";
const router = Router();

router.route("/").post(createFriend).delete(deleteFriend);
router.route("/get-by-id").get(getFriendsById);

router.route("/request").post(createFriendRequest).delete(deleteFriendRequest);
router.route("/requests-by-id").get(getFriendRequestsById);

export { router as friendRouter };
// /api/friends/
