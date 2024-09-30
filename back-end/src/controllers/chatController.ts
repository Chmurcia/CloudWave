// CREATE | READ | UPDATE | DELETE

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
  checkThingExists409,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";

// chatId, userId, role

const createChat = async (req: Request, res: Response): Promise<void> => {
  const {
    ownerId,
    imageUrl,
    chatName,
    maxParticipants,
    description,
    isPrivate,
    messageHisDur,
    is2,
  } = req.body;
  try {
    const existingInfo = await checkThingExists400(
      res,
      !chatName || !maxParticipants || isPrivate === null || !messageHisDur,
      "Import info"
    );
    if (!existingInfo) return;

    const owner = await prisma.users.findUnique({
      where: {
        id: Number(ownerId),
      },
    });
    const existingOwner = await checkThingExists404(res, owner, "Owner");
    if (!existingOwner) return;

    const createdChat = await prisma.chats.create({
      data: {
        owner_id: Number(ownerId),
        image_url: imageUrl,
      },
    });
    await prisma.chat_settings.create({
      data: {
        chat_id: createdChat.id,
        chat_name: chatName,
        max_participants: maxParticipants,
        description,
        is_private: isPrivate,
        message_history_duration: messageHisDur,
        is_2: is2,
      },
    });
    await prisma.chat_users.create({
      data: {
        chat_id: createdChat.id,
        user_id: Number(ownerId),
      },
    });
    await prisma.chat_user_settings.create({
      data: {
        user_id: Number(ownerId),
        chat_id: Number(createdChat.id),
        role: "owner",
      },
    });

    status200Send(res, createdChat);
  } catch (err) {
    status500(res);
  }
};

const getChats = async (req: Request, res: Response): Promise<void> => {
  try {
    const chats = await prisma.chats.findMany();

    status200Send(res, chats);
  } catch (err) {
    status500(res);
  }
};

const getChatsById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const chats = await prisma.chats.findMany({
      where: {
        chat_users: {
          some: {
            user_id: Number(userId),
          },
        },
      },
    });

    status200Send(res, chats);
  } catch (err) {
    status500(res);
  }
};

const deleteChat = async (req: Request, res: Response): Promise<void> => {
  const { chatId } = req.body;
  try {
    const chat = await prisma.chats.findUnique({
      where: {
        id: Number(chatId),
      },
    });
    const existingChat = await checkThingExists404(res, chat, "Chat");
    if (!existingChat) return;

    await prisma.chats.delete({
      where: {
        id: Number(chatId),
      },
    });

    status200Message(res, "Chat deleted successfully");
  } catch (err) {
    status500(res);
  }
};

export { getChats, createChat, getChatsById, deleteChat };
