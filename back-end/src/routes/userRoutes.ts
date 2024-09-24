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
import {
  createWarning,
  deleteWarning,
  deleteWarningsByUserId,
  getWarningsByGaveBy,
  getWarningsByUserId,
  updateWarning,
} from "../controllers/warningController.js";
import {
  createIsPrivate,
  createSeePostsPermission,
  deleteCanSeePosts,
  deleteIsPrivate,
  getIsPrivateByUserId,
  getSeePostsPermissionByUserId,
  updateIsPrivate,
} from "../controllers/isPrivateController.js";

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

router
  .route("/warning")
  .post(createWarning)
  .put(updateWarning)
  .delete(deleteWarning);
router
  .route("/warning/by-user-id")
  .get(getWarningsByUserId)
  .delete(deleteWarningsByUserId);
router.route("/warning/get-by-gave-by").get(getWarningsByGaveBy);

router
  .route("/private/is-private")
  .post(createIsPrivate)
  .get(getIsPrivateByUserId)
  .put(updateIsPrivate)
  .delete(deleteIsPrivate);

router
  .route("/private/can-see")
  .post(createSeePostsPermission)
  .get(getSeePostsPermissionByUserId)
  .delete(deleteCanSeePosts);

export { router as userRouter };
