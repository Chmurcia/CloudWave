import { Router } from "express";
import { createUser, signInUser } from "../controllers/userController.js";
const router = Router();

router.route("/register").post(createUser);
router.route("/login").post(signInUser);

export { router as authRouter };
