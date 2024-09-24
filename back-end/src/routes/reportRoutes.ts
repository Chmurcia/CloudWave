import { Router } from "express";

import {
  createReport, // api/reports/
  getReports, // api/reports/
  getPendingReports, // api/reports/pending
  getResolvedReports, // api/reports/resolved
  getRejectedReports, // api/reports/rejected
  getReportsByAnsweredId, // api/reports/get-by-answered-id
  getReportsByUserId, // api/reports/get-by-user-id
  updateReport, // api/reports/
  deleteReport, // api/reports/
} from "../controllers/reportController.js";

const router = Router();
router
  .route("/")
  .get(getReports)
  .post(createReport)
  .put(updateReport)
  .delete(deleteReport);
router.route("/pending").get(getPendingReports);
router.route("/resolved").get(getResolvedReports);
router.route("/rejected").get(getRejectedReports);
router.route("/get-by-user-id").get(getReportsByUserId);
router.route("/get-by-answered-id").get(getReportsByAnsweredId);

export { router as reportRouter };
