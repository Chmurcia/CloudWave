import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

// TYPES OF NOTIFICATIONS = CHAT / COMMENT / FOLLOWER / FRIEND_REQUEST / LIKE / POST

enum typeOfNot {
  "CHAT",
  "COMMENT",
  "FOLLOWER",
  "FRIEND_REQUEST",
  "LIKE_POST",
  "LIKE_COMMENT",
  "LIKE_MESSAGE",
  "POST",
}

const createNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, type, referenceId, message, isRead, triggeredBy } = req.body;
  try {
    if (!Object.values(typeOfNot).includes(type)) {
      res.status(400).json({
        data: {
          status: 400,
          message: "Invalid notification type",
        },
      });
      return;
    }

    const existingUser = await prisma.users.findUnique({
      where: { id: Number(userId) },
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

    const notification = await prisma.notifications.create({
      data: {
        user_id: Number(userId),
        type,
        reference_id: Number(referenceId),
        message,
        is_read: isRead,
        triggered_by: Number(triggeredBy),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        notification,
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

const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await prisma.notifications.findMany();

    if (!notifications) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Notification not found",
        },
      });
      return;
    }

    res.status(200).json({
      data: {
        status: 200,
        notifications,
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

const getNotificationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({
      where: { id: userId },
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

    const notification = await prisma.notifications.findMany({
      where: { user_id: Number(userId) },
    });

    if (!notification) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Notifications not found",
        },
      });
      return;
    }

    res.status(200).json({
      data: {
        status: 200,
        notification,
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

const getNotificationRT = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { type, referenceId } = req.body;
  try {
    let referenceData;
    switch (type) {
      case "CHAT":
        referenceData = await prisma.chats.findUnique({
          where: { id: Number(referenceId) },
        });
        break;
      case "COMMENT":
        referenceData = await prisma.comments.findUnique({
          where: { id: Number(referenceId) },
          select: { post_id: true },
        });
        break;
      case "FOLLOWER":
        referenceData = await prisma.followers.findUnique({
          where: { id: Number(referenceId) },
          select: { follower_id: true },
        });
        break;
      case "FRIEND_REQUEST":
        referenceData = await prisma.friend_requests.findUnique({
          where: { id: Number(referenceId) },
          select: { sender_id: true },
        });
        break;
      case "LIKE_POST":
        referenceData = await prisma.post_likes.findUnique({
          where: { id: Number(referenceId) },
          select: { post_id: true },
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

const deleteNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.body;
  try {
    const notification = await prisma.notifications.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!notification) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Notification not found",
        },
      });
    }

    await prisma.notifications.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        message: "Notification deleted successfully",
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
  createNotification,
  getNotifications,
  getNotificationById,
  getNotificationRT,
  deleteNotification,
};
