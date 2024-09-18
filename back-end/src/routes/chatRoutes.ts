import { Router } from "express";
import {
  createChat,
  deleteChat,
  getChatsById,
} from "../controllers/chatController.js";
import {
  getChatSettings,
  updateChatSettings,
} from "../controllers/chatSettingController.js";
const router = Router();

router.route("/").post(createChat).delete(deleteChat);
router.route("/get-chats-by-user-id").get(getChatsById);
router.route("/settings").get(getChatSettings).put(updateChatSettings);

export { router as chatRouter };
