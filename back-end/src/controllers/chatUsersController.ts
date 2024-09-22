// CREATE | READ | DELETE

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import {
  status200Message,
  status200Send,
  status500,
} from "../../utils/helpers/status.js";
import {
  checkThingExists404,
  checkThingExists409,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";

const createChatUser = async (req: Request, res: Response): Promise<void> => {
  const { chatId, userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const chat = await prisma.chats.findUnique({
      where: {
        id: Number(chatId),
      },
    });
    const existingChat = await checkThingExists404(res, chat, "Chat");
    if (!existingChat) return;

    const chatUser = await prisma.chat_users.findUnique({
      where: {
        chat_id_user_id: {
          chat_id: Number(chatId),
          user_id: Number(userId),
        },
      },
    });

    const existingChatUser = await checkThingExists409(
      res,
      chatUser,
      "User in the chat"
    );
    if (existingChatUser) return;

    const createdChatUser = await prisma.chat_users.create({
      data: {
        chat_id: Number(chatId),
        user_id: Number(userId),
      },
    });

    status200Send(res, createdChatUser);
  } catch (err) {
    status500(res);
  }
};

const getChatUsers = async (req: Request, res: Response): Promise<void> => {
  const { chatId } = req.body;
  try {
    const chat = await prisma.chats.findUnique({
      where: {
        id: Number(chatId),
      },
    });
    const existingChat = await checkThingExists404(res, chat, "Chat");
    if (!existingChat) return;

    const users = await prisma.users.findMany({
      where: {
        chat_users: {
          some: {
            chat_id: Number(chatId),
          },
        },
      },
    });

    status200Send(res, users);
  } catch (err) {
    status500(res);
  }
};

const deleteChatUser = async (req: Request, res: Response): Promise<void> => {
  const { chatId, userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const chat = await prisma.chats.findUnique({
      where: {
        id: Number(chatId),
      },
    });
    const existingChat = await checkThingExists404(res, chat, "Chat");
    if (!existingChat) return;

    const chatUser = await prisma.chat_users.findUnique({
      where: {
        chat_id_user_id: {
          chat_id: Number(chatId),
          user_id: Number(userId),
        },
      },
    });

    const existingChatUser = await checkThingExists409(
      res,
      chatUser,
      "User in the chat"
    );
    if (existingChatUser) return;

    await prisma.chat_users.delete({
      where: {
        chat_id_user_id: {
          chat_id: Number(chatId),
          user_id: Number(userId),
        },
      },
    });

    status200Message(res, "Chat user deleted successfully");
  } catch (err) {
    status500(res);
  }
};

export { createChatUser, getChatUsers, deleteChatUser };
