import { Router } from "express";
import {
  createNotification,
  getNotifications,
  getNotificationById,
  getNotificationReference,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = Router();

router
  .route("/")
  .post(createNotification)
  .get(getNotifications)
  .delete(deleteNotification);
router.route("/get-by-reference").get(getNotificationReference);
router.route("/get-by-id").get(getNotificationById);

export { router as notificationRouter };
// /api/notification
