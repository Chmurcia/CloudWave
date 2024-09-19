// CREATE | READ | UPDATE | DELETE
// TODO: Create DB

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
// CUS - Chat User Settings

const createCUS = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const existingCUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });

    if (existingCUS && existingCUS.role === "banned") {
      res.status(409).json({
        data: {
          status: 409,
          message: "User is banned!",
        },
      });
      return;
    }

    if (existingCUS) {
      res.status(409).json({
        data: {
          status: 409,
          message: "CUS already exists!",
        },
      });
      return;
    }

    const createdCUS = await prisma.chat_user_settings.create({
      data: {
        user_id: Number(userId),
        chat_id: Number(chatId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        createdCUS,
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

const getCUSByIds = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        CUS,
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

const updateCUSOnHiddenChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, chatId, hiddenChat } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });
    if (!CUS) {
      res.status(404).json({
        data: {
          status: 404,
          message: "CUS not found",
        },
      });
      return;
    }

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS.id),
      },
      data: {
        hidden_chat: hiddenChat,
        updated_at: new Date(),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedCUS,
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

const updateCUSOnPinnedChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, chatId, pinnedChat } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });
    if (!CUS) {
      res.status(404).json({
        data: {
          status: 404,
          message: "CUS not found",
        },
      });
      return;
    }

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS.id),
      },
      data: {
        pinned_chat: pinnedChat,
        updated_at: new Date(),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedCUS,
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

const updateCUSOnNotif = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId, notificationsEnabled } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });
    if (!CUS) {
      res.status(404).json({
        data: {
          status: 404,
          message: "CUS not found",
        },
      });
      return;
    }

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS.id),
      },
      data: {
        notifications_enabled: notificationsEnabled,
        updated_at: new Date(),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedCUS,
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

const updateCUSOnBan = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });
    if (!CUS) {
      res.status(404).json({
        data: {
          status: 404,
          message: "CUS not found",
        },
      });
      return;
    }

    if (CUS && CUS.role === "owner") {
      res.status(409).json({
        data: {
          status: 409,
          message: "Owner cannot be banned!",
        },
      });
      return;
    }

    if (CUS && CUS.role === "moderator") {
      res.status(409).json({
        data: {
          status: 409,
          message: "Moderator cannot be banned!",
        },
      });
      return;
    }

    if (CUS.role === "banned") {
      res.status(409).json({
        data: {
          status: 409,
          message: "User is already banned!",
        },
      });
      return;
    }

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS.id),
      },
      data: {
        role: "banned",
        updated_at: new Date(),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedCUS,
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

const updateCUSOnUnban = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });
    if (!CUS) {
      res.status(404).json({
        data: {
          status: 404,
          message: "CUS not found",
        },
      });
      return;
    }

    if (CUS.role !== "banned") {
      res.status(409).json({
        data: {
          status: 409,
          message: "User is not banned!",
        },
      });
      return;
    }

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS.id),
      },
      data: {
        role: "member",
        updated_at: new Date(),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedCUS,
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

const updateCUSOnMute = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });
    if (!CUS) {
      res.status(404).json({
        data: {
          status: 404,
          message: "CUS not found",
        },
      });
      return;
    }

    if (CUS && CUS.role === "owner") {
      res.status(409).json({
        data: {
          status: 409,
          message: "Owner cannot be muted!",
        },
      });
      return;
    }

    if (CUS && CUS.role === "moderator") {
      res.status(409).json({
        data: {
          status: 409,
          message: "Moderator cannot be muted!",
        },
      });
      return;
    }

    if (CUS.is_muted === true) {
      res.status(409).json({
        data: {
          status: 409,
          message: "User is already muted!",
        },
      });
      return;
    }

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS.id),
      },
      data: {
        is_muted: true,
        updated_at: new Date(),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedCUS,
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

const updateCUSOnUnmute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });
    if (!CUS) {
      res.status(404).json({
        data: {
          status: 404,
          message: "CUS not found",
        },
      });
      return;
    }

    if (CUS.is_muted === false) {
      res.status(409).json({
        data: {
          status: 409,
          message: "User is not muted!",
        },
      });
      return;
    }

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS.id),
      },
      data: {
        is_muted: false,
        updated_at: new Date(),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedCUS,
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

const updateCUSOnRole = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId, role } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });

    if (CUS && CUS.role === "banned") {
      res.status(409).json({
        data: {
          status: 409,
          message: "User is banned!",
        },
      });
      return;
    }
    if (!CUS) {
      res.status(404).json({
        data: {
          status: 404,
          message: "CUS not found",
        },
      });
      return;
    }

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS.id),
      },
      data: {
        role,
        updated_at: new Date(),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedCUS,
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

const deleteCUS = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;
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
    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });

    if (CUS && CUS.role === "owner") {
      res.status(409).json({
        data: {
          status: 409,
          message: "Owner cannot leave!",
          addMessage: "Delete chat or give owner to someone else",
        },
      });
      return;
    }

    if (CUS && CUS.role === "banned") {
      res.status(409).json({
        data: {
          status: 409,
          message: "User is banned!",
        },
      });
      return;
    }
    if (!CUS) {
      res.status(404).json({
        data: {
          status: 404,
          message: "CUS not found",
        },
      });
      return;
    }

    await prisma.chat_user_settings.delete({
      where: {
        id: Number(CUS.id),
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        message: "CUS deleted Successfully",
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
  createCUS, //
  getCUSByIds, //
  updateCUSOnBan, //
  updateCUSOnUnban, //
  updateCUSOnMute, //
  updateCUSOnUnmute, //
  updateCUSOnHiddenChat, //
  updateCUSOnNotif, //
  updateCUSOnPinnedChat, //
  updateCUSOnRole, //
  deleteCUS, //
};
