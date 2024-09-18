import { Router } from "express";
import {
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  updateAvatar,
  deleteAvatar,
} from "../controllers/userController.js";
import {
  createBlockedUser,
  deleteBlockedUsers,
  getBlockedUsers,
} from "../controllers/blockedUserController.js";

const router = Router();

router.route("/").get(getAllUser);
router.route("/user").get(getUser).put(updateUser).delete(deleteUser);
router.route("/avatar").put(updateAvatar).delete(deleteAvatar);

router
  .route("/blocked")
  .post(createBlockedUser)
  .get(getBlockedUsers)
  .delete(deleteBlockedUsers);
export { router as userRouter };
