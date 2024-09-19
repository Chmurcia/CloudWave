import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import url from "url";

import { userRouter } from "./routes/userRoutes.js";
import { tokenRouter } from "./routes/tokenRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { settingRouter } from "./routes/settingRoutes.js";
import { postRouter } from "./routes/postRoutes.js";
import { notificationRouter } from "./routes/notificationRoutes.js";
import { friendRouter } from "./routes/friendRouter.js";
import { messageRouter } from "./routes/messageRouter.js";
import { followerRouter } from "./routes/followerRoutes.js";
import { commentRouter } from "./routes/commentRoutes.js";
import { chatRouter } from "./routes/chatRoutes.js";
import { logRouter } from "./routes/activityLogsRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8081;
const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.render("hello", {
    pageTitle: "Sign Up",
  });
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/tokens", tokenRouter);
app.use("/api/settings", settingRouter);
app.use("/api/posts", postRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/friends", friendRouter);
app.use("/api/messages", messageRouter);
app.use("/api/followers", followerRouter);
app.use("/api/comments", commentRouter);
app.use("/api/chats", chatRouter);
app.use("/api/activity-logs", logRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
