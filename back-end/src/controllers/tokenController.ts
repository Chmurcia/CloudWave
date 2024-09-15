import { Request, Response } from "express";
import { verifyRefreshToken } from "../../utils/jwt.utils.js";
import prisma from "../prisma/prismaClient.js";
import { generateToken, generateRefreshToken } from "../../utils/jwt.utils.js";

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({
      data: {
        status: 401,
        message: "No refresh token provided!",
      },
    });
    return;
  }

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

  const dbUser = await prisma.users.findUnique({ where: { id: user.userId } });
  if (!dbUser) {
    res.status(403).json({
      data: {
        status: 403,
        message: "User not found!",
      },
    });
    return;
  }

  const newAccessToken = generateToken(user.userId);
  const newRefreshToken = generateRefreshToken(user.userId);

  res.status(200).json({
    data: {
      status: 200,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
  });
};

export { refreshToken };
