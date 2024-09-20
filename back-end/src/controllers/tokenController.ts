import { Request, Response } from "express";
import { verifyRefreshToken } from "../../utils/jwt.utils.js";
import prisma from "../prisma/prismaClient.js";
import { generateToken, generateRefreshToken } from "../../utils/jwt.utils.js";
import {
  checkThingExists400,
  checkThingExists404,
} from "../../utils/helpers/checkExists.js";
import { status200Send, status500 } from "../../utils/helpers/status.js";

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    const existingToken = checkThingExists400(res, refreshToken, "Token");
    if (!existingToken) return;

    const user = verifyRefreshToken(refreshToken);
    if (!user) {
      res.status(403).json({
        data: {
          status: 403,
          message: "Invalid refresh token",
        },
      });
      return;
    }

    const dbUser = await prisma.users.findUnique({
      where: { id: user.userId },
    });
    const existingDbUser = await checkThingExists404(res, dbUser, "User");
    if (!existingDbUser) return;

    const newAccessToken = generateToken(user.userId);
    const newRefreshToken = generateRefreshToken(user.userId);

    status200Send(res, {
      tokens: { accessToken: newAccessToken, refreshToken: newRefreshToken },
    });
  } catch (err) {
    status500(res);
  }
};

export { refreshToken };
