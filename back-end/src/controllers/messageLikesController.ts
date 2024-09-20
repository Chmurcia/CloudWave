/// CREATE | READ | DELETE ///
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import {
  checkThingExists404,
  checkThingExists409,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";
import {
  status200Message,
  status200Send,
  status500,
} from "../../utils/helpers/status.js";

const createMessageLike = async (req: Request, res: Response) => {
  const { messageId, userId } = req.body;
  try {
    const message = await prisma.messages.findUnique({
      where: {
        id: Number(messageId),
      },
    });

    const existingMessage = await checkThingExists404(res, message, "Message");
    if (!existingMessage) return;

    const existingUser = await checkUserExists(res, userId);
    if (!existingUser) return;

    const like = await prisma.message_likes.findUnique({
      where: {
        message_id_user_id: {
          message_id: Number(messageId),
          user_id: Number(userId),
        },
      },
    });

    const existingLike = await checkThingExists409(res, like, "Message like");
    if (existingLike) return;

    const createdMessageLike = await prisma.message_likes.create({
      data: {
        message_id: Number(messageId),
        user_id: Number(userId),
      },
    });

    status200Send(res, createdMessageLike);
  } catch (err) {
    status500(res);
  }
};

const getMessageLikesByMessageId = async (req: Request, res: Response) => {
  const { messageId } = req.body;
  try {
    const message = await prisma.messages.findUnique({
      where: {
        id: Number(messageId),
      },
    });
    const existingMessage = await checkThingExists404(res, message, "Message");
    if (!existingMessage) return;

    const MessageLikes = await prisma.message_likes.findMany({
      where: {
        message_id: Number(messageId),
      },
    });

    status200Send(res, MessageLikes);
  } catch (err) {
    status500(res);
  }
};

const getMessageLikesByUserId = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, userId);
    if (!existingUser) return;

    const MessageLikes = await prisma.message_likes.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    status200Send(res, MessageLikes);
  } catch (err) {
    status500(res);
  }
};

const deleteMessageLike = async (req: Request, res: Response) => {
  const { messageLikeId } = req.body;
  try {
    const like = await prisma.message_likes.findUnique({
      where: {
        id: Number(messageLikeId),
      },
    });
    const existingLike = await checkThingExists404(res, like, "Message like");
    if (!existingLike) return;

    await prisma.message_likes.delete({
      where: {
        id: Number(messageLikeId),
      },
    });

    status200Message(res, "Like deleted successfully");
  } catch (err) {
    status500(res);
  }
};

export {
  createMessageLike,
  getMessageLikesByMessageId,
  getMessageLikesByUserId,
  deleteMessageLike,
};
