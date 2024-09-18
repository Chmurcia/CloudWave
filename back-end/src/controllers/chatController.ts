// CREATE | READ | UPDATE | DELETE

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

// chatId, userId, role

const createChat = async (req: Request, res: Response): Promise<void> => {
  const { ownerId, name, imageUrl } = req.body;
  const existingOwner = await prisma.users.findUnique({
    where: {
      id: Number(ownerId),
    },
  });
  if (!existingOwner) {
    res.status(404).json({
      data: {
        status: 404,
        message: "Owner not found",
      },
    });
    return;
  }

  const createdChat = await prisma.chats.create({
    data: {
      owner_id: Number(ownerId),
      name,
      image_url: imageUrl,
    },
  });
  await prisma.chat_users.create({
    data: {
      chat_id: createdChat.id,
      user_id: Number(ownerId),
      role: "owner",
    },
  });
  res.status(200).json({
    data: {
      status: 200,
      createdChat,
    },
  });
  try {
  } catch (err) {
    res.status(500).json({
      data: {
        status: 500,
        message: "Error fetching data",
      },
    });
  }
};

const getChatsById = async (req: Request, res: Response): Promise<void> => {
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
    const chats = await prisma.chats.findMany({
      where: {
        chat_users: {
          some: {
            user_id: Number(userId),
          },
        },
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        chats,
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

const deleteChat = async (req: Request, res: Response): Promise<void> => {
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

    await prisma.chats.delete({
      where: {
        id: Number(chatId),
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        message: "Chat deleted successfully",
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

export { createChat, getChatsById, deleteChat };
