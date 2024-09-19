// CREATE | READ | DELETE

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

enum logType {
  "LIKE_POST",
  "COMMENT",
  "LIKE_COMMENT",
  "LIKE_MESSAGE",
  "FOLLOWING",
  "FRIEND_ACCEPTED",
  "FRIEND_REJECTED",
  "BLOCKED",
  "POST",
}

const createActivityLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, referenceId, type, details } = req.body;
  try {
    if (!Object.values(logType).includes(type)) {
      res.status(400).json({
        data: {
          status: 400,
          message: "Invalid activity log type",
        },
      });
      return;
    }
    if (!details) {
      res.status(400).json({
        data: {
          status: 400,
          message: "Details not provided!",
        },
      });
    }
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
    const activityLog = await prisma.activity_logs.create({
      data: {
        user_id: Number(userId),
        reference_id: Number(referenceId),
        type,
        details,
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        activityLog,
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

const getActivityLogsById = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    const activityLogs = await prisma.activity_logs.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        activityLogs,
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

const deleteActivityLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { logId } = req.body;
  try {
    const existingLog = await prisma.activity_logs.findUnique({
      where: {
        id: Number(logId),
      },
    });
    if (!existingLog) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Log not found",
        },
      });
      return;
    }
    await prisma.activity_logs.delete({
      where: {
        id: Number(logId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        message: "Activity log deleted successfully",
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

const getActivityLogRT = async (req: Request, res: Response): Promise<void> => {
  const { type, referenceId } = req.body;
  try {
    let referenceData;
    switch (type) {
      case "LIKE_POST":
        referenceData = await prisma.posts.findUnique({
          where: { id: Number(referenceId) },
        });
        break;
      case "COMMENT":
        referenceData = await prisma.comments.findUnique({
          where: { id: Number(referenceId) },
          select: { post_id: true },
        });
        break;
      case "FOLLOWING":
        referenceData = await prisma.followers.findUnique({
          where: { id: Number(referenceId) },
          select: { following_id: true },
        });
        break;
      case "FRIEND_ACCEPTED":
        referenceData = await prisma.friend_requests.findUnique({
          where: { id: Number(referenceId) },
          select: { sender_id: true },
        });
        break;
      case "FRIEND_REJECTED":
        referenceData = await prisma.friend_requests.findUnique({
          where: { id: Number(referenceId) },
          select: { sender_id: true },
        });
        break;
      case "LIKE_MESSAGE":
        referenceData = await prisma.message_likes.findUnique({
          where: { id: Number(referenceId) },
          select: { message_id: true },
        });
        break;
      case "LIKE_COMMENT":
        referenceData = await prisma.comment_likes.findUnique({
          where: { id: Number(referenceId) },
          select: { comment_id: true },
        });
        break;
      case "BLOCKED":
        referenceData = await prisma.blocked_users.findUnique({
          where: { id: Number(referenceId) },
          select: { blocked_user_id: true },
        });
        break;
      case "POST":
        referenceData = await prisma.posts.findUnique({
          where: { id: Number(referenceId) },
        });
        break;
    }

    if (!referenceData) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Reference not found",
        },
      });
      return;
    }

    res.status(200).json({
      data: {
        status: 200,
        referenceData,
      },
    });
  } catch (error) {
    res.status(500).json({
      data: {
        status: 500,
        message: "Error fetching data",
      },
    });
  }
};

const deleteActivityLogs = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    await prisma.activity_logs.deleteMany({
      where: {
        user_id: Number(userId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        message: "Activity logs deleted succesfully",
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

export {
  createActivityLog,
  getActivityLogsById,
  getActivityLogRT,
  deleteActivityLog,
  deleteActivityLogs,
};
