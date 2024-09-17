import { Router } from "express";
import {
  createFollower,
  deleteFollower,
  getFollowersById,
  getFollowingsById,
} from "../controllers/followerController.js";
const router = Router();

router.route("/").post(createFollower).delete(deleteFollower);
router.route("/get-followers-by-id").get(getFollowersById);
router.route("/get-followings-by-id").get(getFollowingsById);

export { router as followerRouter };
// /api/followers/
