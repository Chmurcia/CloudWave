import { Router } from "express";
import {
  createUser,
  signInUser,
  changePassword,
} from "../controllers/authController.js";
const router = Router();

router.route("/register").post(createUser);
router.route("/login").post(signInUser);
router.route("/password").put(changePassword);

export { router as authRouter };
