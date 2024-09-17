/// CREATE | READ | DELETE ///
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const createMessageLike = async (req: Request, res: Response) => {
  const { messageId, userId } = req.body;
  try {
    const existingMessage = await prisma.messages.findUnique({
      where: {
        id: Number(messageId),
      },
    });
    if (!existingMessage) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Message not found",
        },
      });
      return;
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

    const existingLike = await prisma.message_likes.findUnique({
      where: {
        message_id_user_id: {
          message_id: Number(messageId),
          user_id: Number(userId),
        },
      },
    });

    if (existingLike) {
      res.status(409).json({
        data: {
          status: 409,
          message: "Message like already exists",
        },
      });
      return;
    }

    const createdMessageLike = await prisma.message_likes.create({
      data: {
        message_id: Number(messageId),
        user_id: Number(userId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        createdMessageLike,
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

const getMessageLikesByMessageId = async (req: Request, res: Response) => {
  const { messageId } = req.body;
  try {
    const existingMessage = await prisma.messages.findUnique({
      where: {
        id: Number(messageId),
      },
    });

    if (!existingMessage) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Message not found",
        },
      });
      return;
    }

    const MessageLikes = await prisma.message_likes.findMany({
      where: {
        message_id: Number(messageId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        MessageLikes,
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

const getMessageLikesByUserId = async (req: Request, res: Response) => {
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

    const MessageLikes = await prisma.message_likes.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        MessageLikes,
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

const deleteMessageLike = async (req: Request, res: Response) => {
  const { messageLikeId } = req.body;
  try {
    const existingLike = await prisma.message_likes.findUnique({
      where: {
        id: Number(messageLikeId),
      },
    });

    if (!existingLike) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Message like not found",
        },
      });
      return;
    }

    await prisma.message_likes.delete({
      where: {
        id: Number(messageLikeId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        message: "Like deleted successfully",
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
  createMessageLike,
  getMessageLikesByMessageId,
  getMessageLikesByUserId,
  deleteMessageLike,
};
