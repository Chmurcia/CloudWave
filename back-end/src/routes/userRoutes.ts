import { Router } from "express";
import {
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  updateAvatar,
  deleteAvatar,
} from "../controllers/userController.js";

const router = Router();

router.route("/").get(getAllUser);
router.route("/user").get(getUser).put(updateUser).delete(deleteUser);
router.route("/avatar").put(updateAvatar).delete(deleteAvatar);

export { router as userRouter };
