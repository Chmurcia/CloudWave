import { Router } from "express";
import { createUser, getAllUser } from "../controllers/userController.js";

const router = Router();

router.route("/sign-up").post(createUser);
router.route("/get-all").get(getAllUser);

export { router as userRouter };
