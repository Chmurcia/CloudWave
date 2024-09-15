import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const getSettings = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
      return;
    }

    const settings = await prisma.user_settings.findUnique({
      where: {
        user_id: id,
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

const updatedTheme = async (req: Request, res: Response) => {
  const { id, theme } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
    }

    const updatedSettings = await prisma.user_settings.update({
      where: { user_id: Number(id) },
      data: {
        theme,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedSettings,
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

const updatedNotifications = async (req: Request, res: Response) => {
  const { id, notifications_enabled } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
    }

    const updatedSettings = await prisma.user_settings.update({
      where: { user_id: Number(id) },
      data: {
        notifications_enabled,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedSettings,
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

const updatedLanguage = async (req: Request, res: Response) => {
  const { id, language } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
    }

    const updatedSettings = await prisma.user_settings.update({
      where: { user_id: Number(id) },
      data: {
        language,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedSettings,
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

const updatedProfileVisibility = async (req: Request, res: Response) => {
  const { id, profile_visibility } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
    }

    const updatedSettings = await prisma.user_settings.update({
      where: { user_id: Number(id) },
      data: {
        profile_visibility,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedSettings,
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

const updatedStatus = async (req: Request, res: Response) => {
  const { id, status } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
    }

    const updatedSettings = await prisma.user_settings.update({
      where: { user_id: Number(id) },
      data: {
        status,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedSettings,
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

const updatedActivityTracking = async (req: Request, res: Response) => {
  const { id, activity_tracking } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
    }

    const updatedSettings = await prisma.user_settings.update({
      where: { user_id: Number(id) },
      data: {
        activity_tracking,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedSettings,
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

const deleteStatus = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
    }

    const updatedStatus = await prisma.user_settings.update({
      where: { user_id: Number(id) },
      data: {
        status: "",
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedStatus,
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
  getSettings,
  updatedTheme,
  updatedNotifications,
  updatedLanguage,
  updatedProfileVisibility,
  updatedStatus,
  updatedActivityTracking,
  deleteStatus,
};
//TODO - CREATE MIDDLEWARES TO SIMPLIFY THE CODE
