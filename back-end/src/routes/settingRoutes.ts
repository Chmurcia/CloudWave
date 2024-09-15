import { Router } from "express";
import {
  getSettings,
  updatedTheme,
  updatedNotifications,
  updatedLanguage,
  updatedProfileVisibility,
  updatedStatus,
  updatedActivityTracking,
  deleteStatus,
} from "../controllers/userSettingController.js";
const router = Router();

router.route("/").get(getSettings);
router.route("/theme").put(updatedTheme);
router.route("/notifications").put(updatedNotifications);
router.route("/language").put(updatedLanguage);
router.route("/profile-visibility").put(updatedProfileVisibility);
router.route("/status").put(updatedStatus).delete(deleteStatus);
router.route("/activity-tracking").put(updatedActivityTracking);

export { router as settingRouter };
