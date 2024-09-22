// CREATE | READ | UPDATE | DELETE

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import { status200Send, status500 } from "../../utils/helpers/status.js";
import { checkThingExists404 } from "../../utils/helpers/checkExists.js";

const getChatSettings = async (req: Request, res: Response): Promise<void> => {
  const { chatId } = req.body;
  try {
    const chat = await prisma.chats.findUnique({
      where: {
        id: Number(chatId),
      },
    });
    const existingChat = await checkThingExists404(res, chat, "Chat");
    if (!existingChat) return;

    const settings = await prisma.chat_settings.findFirst({
      where: {
        chat_id: Number(chatId),
      },
    });

    status200Send(res, settings);
  } catch (err) {
    status500(res);
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
    const existingInfo = await checkThingExists404(
      res,
      !chatName || !maxParticipants || isPrivate === null || !messageHisDur,
      "Important information"
    );
    if (!existingInfo) return;

    const chat = await prisma.chats.findUnique({
      where: {
        id: Number(chatId),
      },
    });
    const existingChat = await checkThingExists404(res, chat, "Chat");
    if (!existingChat) return;

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

    status200Send(res, updatedChatSettings);
  } catch (err) {
    status500(res);
  }
};

export { getChatSettings, updateChatSettings };
