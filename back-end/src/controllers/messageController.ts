/// CREATE | GET | UPDATE | DELETE ///

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import {
  status200Message,
  status200Send,
  status500,
} from "../../utils/helpers/status.js";
import { checkThingExists404 } from "../../utils/helpers/checkExists.js";

const createMessage = async (req: Request, res: Response) => {
  const { chatId, senderId, content } = req.body;
  try {
    const existingContent = await checkThingExists404(res, content, "Content");
    if (!existingContent) return;

    const existingChat = await prisma.chats.findUnique({
      where: {
        id: Number(chatId),
      },
    });
    if (!existingChat) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Chat not found",
        },
      });
      return;
    }
    const existingSender = await prisma.users.findUnique({
      where: {
        id: Number(senderId),
      },
    });

    if (!existingSender) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Sender not found",
        },
      });
      return;
    }

    const ifSenderInChat = await prisma.chat_users.findFirst({
      where: {
        AND: [{ chat_id: Number(chatId) }, { user_id: Number(senderId) }],
      },
    });

    if (!ifSenderInChat) {
      res.status(403).json({
        data: {
          status: 403,
          message: "Sender is not in the chat",
        },
      });
      return;
    }
    const createdMessage = await prisma.messages.create({
      data: {
        chat_id: Number(chatId),
        sender_id: Number(senderId),
        content,
      },
    });

    status200Send(res, createdMessage);
  } catch (err) {
    status500(res);
  }
};

const getMessagesByUserChatId = async (req: Request, res: Response) => {
  const { senderId, chatId } = req.body;
  try {
    const existingSender = await prisma.users.findUnique({
      where: {
        id: Number(senderId),
      },
    });

    if (!existingSender) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Sender not found",
        },
      });
      return;
    }

    const existingChat = await prisma.chats.findUnique({
      where: {
        id: Number(chatId),
      },
    });
    if (!existingChat) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Chat not found",
        },
      });
      return;
    }

    const messages = await prisma.messages.findMany({
      where: {
        AND: [{ chat_id: Number(chatId) }, { sender_id: Number(senderId) }],
      },
    });
    status200Send(res, messages);
  } catch (err) {
    status500(res);
  }
};

const getMessagesByChatId = async (req: Request, res: Response) => {
  const { chatId } = req.body;
  try {
    const existingChat = await prisma.chats.findUnique({
      where: {
        id: Number(chatId),
      },
    });
    if (!existingChat) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Chat not found",
        },
      });
      return;
    }

    const messages = await prisma.messages.findMany({
      where: {
        chat_id: Number(chatId),
      },
    });
    status200Send(res, messages);
  } catch (err) {
    status500(res);
  }
};

const updateMessage = async (req: Request, res: Response) => {
  const { userId, chatId, messageId, content } = req.body;
  try {
    if (!content) {
      res.status(404).json({
        data: {
          status: 404,
          message: "No content provided",
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

    const existingChat = await prisma.chats.findUnique({
      where: {
        id: Number(chatId),
      },
    });

    if (!existingChat) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Chat not found",
        },
      });
      return;
    }

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

    const ifUserInChat = await prisma.chat_users.findFirst({
      where: {
        AND: [{ chat_id: Number(chatId) }, { user_id: Number(userId) }],
      },
    });
    if (!ifUserInChat) {
      res.status(403).json({
        data: {
          status: 403,
          message: "Sender is not in the chat",
        },
      });
      return;
    }
    const updatedMessage = await prisma.messages.update({
      where: {
        id: Number(messageId),
      },
      data: {
        content,
        updated_at: new Date(),
      },
    });

    status200Send(res, updatedMessage);
  } catch (err) {
    status500(res);
  }
};

const deleteMessage = async (req: Request, res: Response) => {
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

    await prisma.messages.delete({
      where: {
        id: Number(messageId),
      },
    });

    status200Message(res, "Message deleted successfully");
  } catch (err) {
    status500(res);
  }
};

export {
  createMessage,
  getMessagesByUserChatId,
  getMessagesByChatId,
  updateMessage,
  deleteMessage,
};
