import { Router } from "express";
import {
  createActivityLog,
  deleteActivityLog,
  deleteActivityLogs,
  getActivityLogRT,
  getActivityLogsById,
} from "../controllers/activityLogController.js";

const router = Router();

router
  .route("/")
  .post(createActivityLog)
  .get(getActivityLogsById)
  .delete(deleteActivityLog);
router.route("/delete-many").delete(deleteActivityLogs);
router.route("/get-by-rt").get(getActivityLogRT);

export { router as logRouter };
