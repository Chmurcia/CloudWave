import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getMessagesByChatId,
  getMessagesByUserChatId,
  updateMessage,
} from "../controllers/messageController.js";
import {
  createMessageLike,
  deleteMessageLike,
  getMessageLikesByMessageId,
  getMessageLikesByUserId,
} from "../controllers/messageLikesController.js";
const router = Router();

router.route("/").post(createMessage).put(updateMessage).delete(deleteMessage);
router.route("/get-by-userchat-id").get(getMessagesByUserChatId);
router.route("/get-by-chat-id").get(getMessagesByChatId);

router.route("/like").post(createMessageLike).delete(deleteMessageLike);
router.route("/like/get-by-user-id").get(getMessageLikesByUserId);
router.route("/like/get-by-message-id").get(getMessageLikesByMessageId);

export { router as messageRouter };
// /api/messages/
