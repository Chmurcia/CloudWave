import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import url from "url";

import { userRouter } from "./routes/userRoutes.js";
import { tokenRouter } from "./routes/tokenRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8081;
const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.render("hello", {
    pageTitle: "Sign Up",
  });
});

app.use("/api/users", userRouter);
app.use("/api/token", tokenRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
