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
import {
  createChatUser,
  deleteChatUser,
  getChatUsers,
} from "../controllers/chatUsersController.js";
import {
  createCUS,
  deleteCUS,
  getCUSByIds,
  updateCUSOnBan,
  updateCUSOnHiddenChat,
  updateCUSOnMute,
  updateCUSOnNotif,
  updateCUSOnPinnedChat,
  updateCUSOnRole,
  updateCUSOnUnban,
  updateCUSOnUnmute,
} from "../controllers/chatUsersSettingControllers.js";
const router = Router();

router.route("/").post(createChat).delete(deleteChat);
router.route("/get-chats-by-user-id").get(getChatsById);

router.route("/settings").get(getChatSettings).put(updateChatSettings);

router.route("/user-settings");

router
  .route("/user")
  .post(createChatUser)
  .get(getChatUsers)
  .delete(deleteChatUser);

router.route("/user-settings").post(createCUS).delete(deleteCUS);
router.route("/user-settings/get-by-ids").get(getCUSByIds);
router.route("/user-settings/ban").put(updateCUSOnBan);
router.route("/user-settings/unban").put(updateCUSOnUnban);
router.route("/user-settings/mute").put(updateCUSOnMute);
router.route("/user-settings/unmute").put(updateCUSOnUnmute);
router.route("/user-settings/hidden-chat").put(updateCUSOnHiddenChat);
router.route("/user-settings/pinned-chat").put(updateCUSOnPinnedChat);
router.route("/user-settings/notifications-enabled").put(updateCUSOnNotif);
router.route("/user-settings/role").put(updateCUSOnRole);
export { router as chatRouter };
