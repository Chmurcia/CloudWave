// CREATE | READ | DELETE

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const createBlockedUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, blockedUserId } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!existingUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
      return;
    }
    const existingBlockedUser = await prisma.users.findUnique({
      where: {
        id: Number(blockedUserId),
      },
    });
    if (!existingBlockedUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Blocked user not found",
        },
      });
      return;
    }
    const existingBlocked = await prisma.blocked_users.findUnique({
      where: {
        user_id_blocked_user_id: {
          user_id: Number(userId),
          blocked_user_id: Number(blockedUserId),
        },
      },
    });

    if (existingBlocked) {
      res.status(409).json({
        data: {
          status: 409,
          message: "User already blocked!",
        },
      });
      return;
    }
    const createdBlockedUser = await prisma.blocked_users.create({
      data: {
        user_id: Number(userId),
        blocked_user_id: Number(blockedUserId),
      },
    });

    res.status(200).json({
      status: 200,
      createdBlockedUser,
    });
  } catch (err) {
    res.status(500).json({
      data: {
        status: 500,
        message: "Error fetching data",
      },
    });
  }
};

const getBlockedUsers = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!existingUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
      return;
    }
    const blockedUsers = await prisma.blocked_users.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        blockedUsers,
      },
    });
  } catch (err) {
    res.status(500).json({
      data: {
        status: 500,
        message: "Error fetching data",
      },
    });
  }
};

const deleteBlockedUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, blockedUserId } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!existingUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
      return;
    }
    const existingBlockedUser = await prisma.users.findUnique({
      where: {
        id: Number(blockedUserId),
      },
    });
    if (!existingBlockedUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Blocked user not found",
        },
      });
      return;
    }
    const existingBlocked = await prisma.blocked_users.findUnique({
      where: {
        user_id_blocked_user_id: {
          user_id: Number(userId),
          blocked_user_id: Number(blockedUserId),
        },
      },
    });

    if (!existingBlocked) {
      res.status(409).json({
        data: {
          status: 409,
          message: "User is not blocked!",
        },
      });
      return;
    }
    await prisma.blocked_users.delete({
      where: {
        user_id_blocked_user_id: {
          user_id: Number(userId),
          blocked_user_id: Number(blockedUserId),
        },
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        message: "User unblocked successfully!",
      },
    });
  } catch (err) {
    res.status(500).json({
      data: {
        status: 500,
        message: "Error fetching data",
      },
    });
  }
};

export { createBlockedUser, getBlockedUsers, deleteBlockedUsers };
