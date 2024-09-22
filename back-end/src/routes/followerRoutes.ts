import { Router } from "express";
import {
  createFollower,
  deleteFollow,
  getFollowersById,
  getFollowingsById,
} from "../controllers/followerController.js";
const router = Router();

router.route("/").post(createFollower).delete(deleteFollow);
router.route("/get-followers-by-id").get(getFollowersById);
router.route("/get-followings-by-id").get(getFollowingsById);

export { router as followerRouter };
// /api/followers/
