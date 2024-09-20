import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import { checkUserExists } from "../../utils/helpers/checkExists.js";
import { status200Send, status500 } from "../../utils/helpers/status.js";

const getSettings = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;
  try {
    const user = await checkUserExists(res, Number(userId));
    if (!user) return;

    const settings = await prisma.user_settings.findUnique({
      where: {
        user_id: userId,
      },
    });

    status200Send(res, settings);
  } catch (err) {
    status500(res);
  }
};

const updatedTheme = async (req: Request, res: Response) => {
  const { userId, theme } = req.body;

  try {
    const user = await checkUserExists(res, Number(userId));
    if (!user) return;

    const updatedSettings = await prisma.user_settings.update({
      where: { user_id: Number(userId) },
      data: {
        theme,
      },
    });

    status200Send(res, updatedSettings);
  } catch (err) {
    status500(res);
  }
};

const updatedNotifications = async (req: Request, res: Response) => {
  const { userId, notifications_enabled } = req.body;

  try {
    const user = await checkUserExists(res, Number(userId));
    if (!user) return;

    const updatedSettings = await prisma.user_settings.update({
      where: { user_id: Number(userId) },
      data: {
        notifications_enabled,
      },
    });

    status200Send(res, updatedSettings);
  } catch (err) {
    status500(res);
  }
};

const updatedLanguage = async (req: Request, res: Response) => {
  const { userId, language } = req.body;

  try {
    const user = await checkUserExists(res, Number(userId));
    if (!user) return;

    const updatedSettings = await prisma.user_settings.update({
      where: { user_id: Number(userId) },
      data: {
        language,
      },
    });

    status200Send(res, updatedSettings);
  } catch (err) {
    status500(res);
  }
};

const updatedProfileVisibility = async (req: Request, res: Response) => {
  const { userId, profile_visibility } = req.body;

  try {
    const user = await checkUserExists(res, Number(userId));
    if (!user) return;

    const updatedSettings = await prisma.user_settings.update({
      where: { user_id: Number(userId) },
      data: {
        profile_visibility,
      },
    });

    status200Send(res, updatedSettings);
  } catch (err) {
    status500(res);
  }
};

const updatedStatus = async (req: Request, res: Response) => {
  const { userId, status } = req.body;

  try {
    const user = await checkUserExists(res, Number(userId));
    if (!user) return;

    const updatedSettings = await prisma.user_settings.update({
      where: { user_id: Number(userId) },
      data: {
        status,
      },
    });

    status200Send(res, updatedSettings);
  } catch (err) {
    status500(res);
  }
};

const updatedActivityTracking = async (req: Request, res: Response) => {
  const { userId, activity_tracking } = req.body;
  try {
    const user = await checkUserExists(res, Number(userId));
    if (!user) return;

    const updatedSettings = await prisma.user_settings.update({
      where: { user_id: Number(userId) },
      data: {
        activity_tracking,
      },
    });
    status200Send(res, updatedSettings);
  } catch (err) {
    status500(res);
  }
};

const deleteStatus = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const user = await checkUserExists(res, Number(userId));
    if (!user) return;

    const updatedStatus = await prisma.user_settings.update({
      where: { user_id: Number(userId) },
      data: {
        status: "",
      },
    });
    status200Send(res, updatedStatus);
  } catch (err) {
    status500(res);
  }
};

export {
  getSettings,
  updatedTheme,
  updatedNotifications,
  updatedLanguage,
  updatedProfileVisibility,
  updatedStatus,
  updatedActivityTracking,
  deleteStatus,
};
