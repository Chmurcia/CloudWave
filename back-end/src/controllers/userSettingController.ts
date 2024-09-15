import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const getSetting = async (req: Request, res: Response): Promise<void> => {
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

    const settings = await prisma.user_settings.findMany({
      where: {
        user_id: id,
      },
    });

    res.send(200).json({
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
