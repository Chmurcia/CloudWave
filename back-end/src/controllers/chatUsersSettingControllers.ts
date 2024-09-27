// CREATE | READ | UPDATE | DELETE
// TODO: Create DB

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
  checkThingCUS409,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";
// CUS - Chat User Settings

const createCUS = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });

    const existingCUS = await checkThingExists409(res, CUS, "CUS");
    if (existingCUS) return;

    const createdCUS = await prisma.chat_user_settings.create({
      data: {
        user_id: Number(userId),
        chat_id: Number(chatId),
      },
    });

    status200Send(res, createdCUS);
  } catch (err) {
    status500(res);
  }
};

const getCUSByIds = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });

    status200Send(res, CUS);
  } catch (err) {
    status500(res);
  }
};

const updateCUSOnHiddenChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, chatId, hiddenChat } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });
    const existingCUS = await checkThingExists404(res, CUS, "CUS");
    if (!existingCUS) return;

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS!.id),
      },
      data: {
        hidden_chat: hiddenChat,
        updated_at: new Date(),
      },
    });

    status200Send(res, updatedCUS);
  } catch (err) {
    status500(res);
  }
};

const updateCUSOnPinnedChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, chatId, pinnedChat } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });
    const existingCUS = await checkThingExists404(res, CUS, "CUS");
    if (!existingCUS) return;

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS!.id),
      },
      data: {
        pinned_chat: pinnedChat,
        updated_at: new Date(),
      },
    });

    status200Send(res, updatedCUS);
  } catch (err) {
    status500(res);
  }
};

const updateCUSOnNotif = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId, notificationsEnabled } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(chatId));
    if (!existingUser) return;

    const chat = await prisma.chats.findUnique({
      where: {
        id: Number(chatId),
      },
    });
    const existingChat = await checkThingExists404(res, chat, "Chat");
    if (!existingChat) return;

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });
    const existingCUS = await checkThingExists404(res, CUS, "CUS");
    if (!existingCUS) return;

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS!.id),
      },
      data: {
        notifications_enabled: notificationsEnabled,
        updated_at: new Date(),
      },
    });

    status200Send(res, updatedCUS);
  } catch (err) {
    status500(res);
  }
};

const updateCUSOnBan = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });
    const existingCUS = await checkThingExists404(res, CUS, "CUS");
    if (!existingCUS) return;

    const CUSowner = await checkThingCUS409(
      res,
      CUS!.role === "owner",
      "owner",
      "banned"
    );
    if (CUSowner) return;

    const CUSmoderator = await checkThingCUS409(
      res,
      CUS!.role === "moderator",
      "moderator",
      "banned"
    );
    if (CUSmoderator) return;

    const CUSbanned = await checkThingCUS409(
      res,
      CUS!.role === "banned",
      "User",
      "banned"
    );

    if (CUSbanned) return;

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS!.id),
      },
      data: {
        role: "banned",
        updated_at: new Date(),
      },
    });

    status200Send(res, updatedCUS);
  } catch (err) {
    status500(res);
  }
};

const updateCUSOnUnban = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });
    const existingCUS = await checkThingExists404(res, CUS, "CUS");
    if (!existingCUS) return;

    const CUSunbanned = await checkThingCUS409(
      res,
      CUS!.role !== "banned",
      "User",
      "unbanned"
    );
    if (CUSunbanned) return;

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS!.id),
      },
      data: {
        role: "member",
        updated_at: new Date(),
      },
    });

    status200Send(res, updatedCUS);
  } catch (err) {
    status500(res);
  }
};

const updateCUSOnMute = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });

    const existingCUS = await checkThingExists404(res, CUS, "CUS");
    if (!existingCUS) return;

    const CUSbanned = await checkThingCUS409(
      res,
      CUS!.role === "banned",
      "User",
      "banned"
    );
    if (CUSbanned) return;

    const CUSowner = await checkThingCUS409(
      res,
      CUS!.role === "owner",
      "owner",
      "muted"
    );
    if (CUSowner) return;

    const CUSmoderator = await checkThingCUS409(
      res,
      CUS!.role === "moderator",
      "moderator",
      "muted"
    );
    if (CUSmoderator) return;

    const CUSmuted = await checkThingCUS409(
      res,
      CUS!.is_muted === true,
      "User",
      "muted"
    );
    if (CUSmuted) return;

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS!.id),
      },
      data: {
        is_muted: true,
        updated_at: new Date(),
      },
    });

    status200Send(res, updatedCUS);
  } catch (err) {
    status500(res);
  }
};

const updateCUSOnUnmute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });

    const existingCUS = await checkThingExists404(res, CUS, "CUS");
    if (!existingCUS) return;

    const CUSbanned = await checkThingCUS409(
      res,
      CUS!.role === "banned",
      "User",
      "banned"
    );
    if (CUSbanned) return;

    const CUSunmuted = await checkThingCUS409(
      res,
      CUS!.is_muted === false,
      "User",
      "unmuted"
    );

    if (CUSunmuted) return;

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS!.id),
      },
      data: {
        is_muted: false,
        updated_at: new Date(),
      },
    });

    status200Send(res, updatedCUS);
  } catch (err) {
    status500(res);
  }
};

const updateCUSOnRole = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId, role } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });

    const existingCUS = await checkThingExists404(res, CUS, "CUS");
    if (!existingCUS) return;

    const CUSbanned = await checkThingCUS409(
      res,
      CUS!.role === "banned",
      "User",
      "banned"
    );
    if (CUSbanned) return;

    const updatedCUS = await prisma.chat_user_settings.update({
      where: {
        id: Number(CUS!.id),
      },
      data: {
        role,
        updated_at: new Date(),
      },
    });

    status200Send(res, updatedCUS);
  } catch (err) {
    status500(res);
  }
};

const deleteCUS = async (req: Request, res: Response): Promise<void> => {
  const { userId, chatId } = req.body;
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

    const CUS = await prisma.chat_user_settings.findFirst({
      where: {
        AND: [{ user_id: Number(userId) }, { chat_id: Number(chatId) }],
      },
    });

    const existingCUS = await checkThingExists404(res, CUS, "CUS");
    if (!existingCUS) return;

    const CUSowner = await checkThingCUS409(
      res,
      CUS!.role === "owner",
      "Owner",
      "owner"
    );
    if (CUSowner) return;

    const CUSbanned = await checkThingCUS409(
      res,
      CUS!.role === "banned",
      "User",
      "banned"
    );
    if (CUSbanned) return;

    await prisma.chat_user_settings.delete({
      where: {
        id: Number(CUS!.id),
      },
    });

    status200Message(res, "CUS deleted Successfully");
  } catch (err) {
    status500(res);
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
