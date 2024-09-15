import { Router } from "express";
import { getAllUser, getUser } from "../controllers/userController.js";

const router = Router();

router.route("/").get(getAllUser);
router.route("/user").get(getUser);

export { router as userRouter };
