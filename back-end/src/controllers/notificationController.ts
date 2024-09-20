import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import {
  checkThingExists404,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";
import {
  status200Message,
  status200Send,
  status500,
} from "../../utils/helpers/status.js";

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

    const existingUser = await checkUserExists(res, userId);
    if (!existingUser) return;

    const createdNotification = await prisma.notifications.create({
      data: {
        user_id: Number(userId),
        type,
        reference_id: Number(referenceId),
        message,
        is_read: isRead,
        triggered_by: Number(triggeredBy),
      },
    });

    status200Send(res, createdNotification);
  } catch (err) {
    status500(res);
  }
};

const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await prisma.notifications.findMany();

    const existingNotif = await checkThingExists404(
      res,
      notifications,
      "Notifications"
    );
    if (!existingNotif) return;

    status200Send(res, notifications);
  } catch (err) {
    status500(res);
  }
};

const getNotificationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, userId);
    if (!existingUser) return;

    const notifications = await prisma.notifications.findMany({
      where: { user_id: Number(userId) },
    });

    const existingNotif = await checkThingExists404(
      res,
      notifications,
      "Notifications"
    );
    if (!existingNotif) return;

    status200Send(res, notifications);
  } catch (err) {
    status500(res);
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

    const existingRefData = await checkThingExists404(
      res,
      referenceData,
      "Reference"
    );
    if (!existingRefData) return;

    status200Send(res, referenceData);
  } catch (error) {
    status500(res);
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
    const existingNotif = await checkThingExists404(
      res,
      notification,
      "Notification"
    );
    if (!existingNotif) return;

    await prisma.notifications.delete({
      where: {
        id: Number(id),
      },
    });

    status200Message(res, "Notification deleted successfully");
  } catch (err) {
    status500(res);
  }
};

export {
  createNotification,
  getNotifications,
  getNotificationById,
  getNotificationRT,
  deleteNotification,
};
