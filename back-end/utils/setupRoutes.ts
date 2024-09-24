import { Router } from "express";

import { userRouter } from "../src/routes/userRoutes.js";
import { tokenRouter } from "../src/routes/tokenRoutes.js";
import { authRouter } from "../src/routes/authRoutes.js";
import { settingRouter } from "../src/routes/settingRoutes.js";
import { postRouter } from "../src/routes/postRoutes.js";
import { notificationRouter } from "../src/routes/notificationRoutes.js";
import { friendRouter } from "../src/routes/friendRouter.js";
import { messageRouter } from "../src/routes/messageRouter.js";
import { followerRouter } from "../src/routes/followerRoutes.js";
import { commentRouter } from "../src/routes/commentRoutes.js";
import { chatRouter } from "../src/routes/chatRoutes.js";
import { logRouter } from "../src/routes/activityLogsRoutes.js";

export const setupRoutes = (app: Router) => {
  const routers = {
    "/api/users": userRouter,
    "/api/auth": authRouter,
    "/api/tokens": tokenRouter,
    "/api/settings": settingRouter,
    "/api/posts": postRouter,
    "/api/notifications": notificationRouter,
    "/api/friends": friendRouter,
    "/api/messages": messageRouter,
    "/api/followers": followerRouter,
    "/api/comments": commentRouter,
    "/api/chats": chatRouter,
    "/api/activity-logs": logRouter,
  };

  Object.entries(routers).forEach(([path, router]) => {
    app.use(path, router);
  });
};
