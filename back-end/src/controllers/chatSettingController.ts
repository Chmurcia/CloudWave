// CREATE | READ | UPDATE | DELETE

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const getChatSettings = async (req: Request, res: Response): Promise<void> => {
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
    const settings = await prisma.chat_settings.findFirst({
      where: {
        chat_id: Number(chatId),
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        settings,
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

const updateChatSettings = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    chatId,
    chatName,
    maxParticipants,
    description,
    isPrivate,
    messageHisDur,
  } = req.body;
  try {
    if (!chatName || !maxParticipants || isPrivate === null || !messageHisDur) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Required informations not provided",
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

    const chatSettings = await prisma.chat_settings.findFirst({
      where: {
        chat_id: Number(existingChat.id),
      },
    });

    const updatedChatSettings = await prisma.chat_settings.update({
      where: {
        id: Number(chatSettings?.id),
      },
      data: {
        chat_name: chatName,
        max_participants: maxParticipants,
        description,
        is_private: isPrivate,
        message_history_duration: messageHisDur,
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        updatedChatSettings,
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

export { getChatSettings, updateChatSettings };
