import express, { Request, Response } from "express";
import dotenv from "dotenv";

import { userRouter } from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
