import { Router } from "express";
import {
  createChat,
  deleteChat,
  getChatsById,
} from "../controllers/chatController.js";
const router = Router();

router.route("/").post(createChat).get(getChatsById).delete(deleteChat);

export { router as chatRouter };
