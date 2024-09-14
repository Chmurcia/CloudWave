import { Router } from "express";
import {
  createUser,
  getAllUser,
  signInUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/sign-up").post(createUser);
router.route("/sign-in").post(signInUser);
router.route("/get-all").get(authenticateToken, getAllUser);

export { router as userRouter };
