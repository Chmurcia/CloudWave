// CREATE | READ | DELETE

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import {
  status200Message,
  status200Send,
  status500,
} from "../../utils/helpers/status.js";
import {
  checkThingExists400,
  checkThingExists404,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";

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
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    if (!Object.values(logType).includes(type)) {
      res.status(400).json({
        data: {
          status: 400,
          message: "Invalid activity log type",
        },
      });
      return;
    }
    const existingDetails = await checkThingExists400(res, details, "Details");
    if (!existingDetails) return;

    const activityLog = await prisma.activity_logs.create({
      data: {
        user_id: Number(userId),
        reference_id: Number(referenceId),
        type,
        details,
      },
    });
    status200Send(res, activityLog);
  } catch (err) {
    status500(res);
  }
};

const getActivityLogsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const activityLogs = await prisma.activity_logs.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    status200Send(res, activityLogs);
  } catch (err) {
    status500(res);
  }
};

const deleteActivityLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { logId } = req.body;
  try {
    const log = await prisma.activity_logs.findUnique({
      where: {
        id: Number(logId),
      },
    });
    const existingLog = await checkThingExists404(res, log, "Log");
    if (!existingLog) return;

    await prisma.activity_logs.delete({
      where: {
        id: Number(logId),
      },
    });

    status200Message(res, "Activity log deleted successfully");
  } catch (err) {
    status500(res);
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

const deleteActivityLogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    await prisma.activity_logs.deleteMany({
      where: {
        user_id: Number(userId),
      },
    });

    status200Message(res, "Activity logs deleted successfully");
  } catch (err) {
    status500(res);
  }
};

export {
  createActivityLog,
  getActivityLogsById,
  getActivityLogRT,
  deleteActivityLog,
  deleteActivityLogs,
};
