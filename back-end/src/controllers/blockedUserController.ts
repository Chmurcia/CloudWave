// CREATE | READ | DELETE

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import {
  status200Message,
  status200Send,
  status500,
} from "../../utils/helpers/status.js";
import {
  checkThingExists404,
  checkThingExists409,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";

const createBlockedUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, blockedUserId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const blockedUser = await prisma.users.findUnique({
      where: {
        id: Number(blockedUserId),
      },
    });
    const existingBlockedUser = await checkThingExists404(
      res,
      blockedUser,
      "Blocked user"
    );
    if (!existingBlockedUser) return;

    const blocked = await prisma.blocked_users.findUnique({
      where: {
        user_id_blocked_user_id: {
          user_id: Number(userId),
          blocked_user_id: Number(blockedUserId),
        },
      },
    });

    const existingBlocked = await checkThingExists409(
      res,
      blocked,
      "Blocked user"
    );
    if (existingBlocked) return;

    const createdBlockedUser = await prisma.blocked_users.create({
      data: {
        user_id: Number(userId),
        blocked_user_id: Number(blockedUserId),
      },
    });

    status200Send(res, createdBlockedUser);
  } catch (err) {
    status500(res);
  }
};

const getBlockedUsers = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const blockedUsers = await prisma.blocked_users.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    status200Send(res, blockedUsers);
  } catch (err) {
    status500(res);
  }
};

const deleteBlockedUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, blockedUserId } = req.body;

  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const blockedUser = await prisma.users.findUnique({
      where: {
        id: Number(blockedUserId),
      },
    });
    const existingBlockedUser = await checkThingExists404(
      res,
      blockedUser,
      "Blocked user"
    );
    if (!existingBlockedUser) return;

    const blocked = await prisma.blocked_users.findUnique({
      where: {
        user_id_blocked_user_id: {
          user_id: Number(userId),
          blocked_user_id: Number(blockedUserId),
        },
      },
    });
    const existingBlocked = await checkThingExists404(
      res,
      blocked,
      "Blocked user"
    );
    if (!existingBlocked) return;

    await prisma.blocked_users.delete({
      where: {
        user_id_blocked_user_id: {
          user_id: Number(userId),
          blocked_user_id: Number(blockedUserId),
        },
      },
    });

    status200Message(res, "User unblocked successfully");
  } catch (err) {
    status500(res);
  }
};

export { createBlockedUser, getBlockedUsers, deleteBlockedUsers };
