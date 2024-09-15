import { Router } from "express";
import { refreshToken } from "../controllers/tokenController.js";

const router = Router();

router.route("/refresh-token").post(refreshToken);

export { router as tokenRouter };
