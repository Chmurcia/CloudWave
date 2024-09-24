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
import {
  createExtLink,
  deleteExtLink,
  getExtLinksByUserId,
  updateExtLink,
} from "../controllers/externalLinkController.js";

const router = Router();

router.route("/").get(getAllUser);
router.route("/user").get(getUser).put(updateUser).delete(deleteUser);
router.route("/avatar").put(updateAvatar).delete(deleteAvatar);

router
  .route("/blocked")
  .post(createBlockedUser)
  .get(getBlockedUsers)
  .delete(deleteBlockedUsers);

router
  .route("/link")
  .post(createExtLink)
  .put(updateExtLink)
  .delete(deleteExtLink);

router.route("/link/get-by-user-id").get(getExtLinksByUserId);

export { router as userRouter };
