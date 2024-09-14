import { Router } from "express";
import { createUser } from "../controllers/userController.js";

const router = Router();

router.route("/sign-up").post(createUser);

export { router as userRouter };
