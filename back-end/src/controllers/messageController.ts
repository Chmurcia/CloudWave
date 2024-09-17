/// CREATE | GET | UPDATE | DELETE ///

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const createMessage = async (req: Request, res: Response) => {
  const { chatId, senderId, content } = req.body;
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

    res.status(200).json({
      data: {
        status: 200,
        createdMessage,
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
    res.status(200).json({
      data: {
        status: 200,
        messages,
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
    res.status(200).json({
      data: {
        status: 200,
        messages,
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

    res.status(200).json({
      data: {
        status: 200,
        updatedMessage,
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

    res.status(200).json({
      data: {
        status: 200,
        message: "Message deleted successfully",
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
  createMessage,
  getMessagesByUserChatId,
  getMessagesByChatId,
  updateMessage,
  deleteMessage,
};
