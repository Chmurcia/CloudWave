// CREATE | READ | DELETE

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const createChatUser = async (req: Request, res: Response): Promise<void> => {
  const { chatId, userId } = req.body;
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

    const existingChatUser = await prisma.chat_users.findUnique({
      where: {
        chat_id_user_id: {
          chat_id: Number(chatId),
          user_id: Number(userId),
        },
      },
    });

    if (existingChatUser) {
      res.status(409).json({
        data: {
          status: 409,
          message: "User already exists in a given chat!",
        },
      });
      return;
    }
    const createdChatUser = await prisma.chat_users.create({
      data: {
        chat_id: Number(chatId),
        user_id: Number(userId),
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        createdChatUser,
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

const getChatUsers = async (req: Request, res: Response): Promise<void> => {
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

    const users = await prisma.users.findMany({
      where: {
        chat_users: {
          some: {
            chat_id: Number(chatId),
          },
        },
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        users,
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

const deleteChatUser = async (req: Request, res: Response): Promise<void> => {
  const { chatId, userId } = req.body;
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

    // CHECK ROLE FROM chatUserSettings

    const existingChatUser = await prisma.chat_users.findUnique({
      where: {
        chat_id_user_id: {
          chat_id: Number(chatId),
          user_id: Number(userId),
        },
      },
    });

    if (!existingChatUser) {
      res.status(409).json({
        status: 404,
        message: "User does not exists in a given chat!",
      });
      return;
    }

    await prisma.chat_users.delete({
      where: {
        chat_id_user_id: {
          chat_id: Number(chatId),
          user_id: Number(userId),
        },
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        message: "Chat user deleted successfully",
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

export { createChatUser, getChatUsers, deleteChatUser };
