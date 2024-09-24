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

const createWarning = async (req: Request, res: Response): Promise<void> => {
  const { userId, warningContent, gaveBy } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const existingGiver = await checkUserExists(res, Number(gaveBy), "Gaver");
    if (!existingGiver) return;

    const existingWarning = await checkThingExists404(
      res,
      warningContent,
      "Warning"
    );
    if (!existingWarning) return;

    const createdWarning = await prisma.user_warnings.create({
      data: {
        user_id: Number(userId),
        warning: warningContent,
        gave_by: Number(gaveBy),
      },
    });

    status200Send(res, createdWarning);
  } catch (err) {
    // status500(res);
    res.json({ err });
  }
};
const getWarningsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const warnings = await prisma.user_warnings.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    status200Send(res, warnings);
  } catch (err) {
    status500(res);
  }
};

const getWarningsByGaveBy = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { gaveBy } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(gaveBy));
    if (!existingUser) return;

    const warnings = await prisma.user_warnings.findMany({
      where: {
        gave_by: Number(gaveBy),
      },
    });

    status200Send(res, warnings);
  } catch (err) {
    status500(res);
  }
};

const updateWarning = async (req: Request, res: Response): Promise<void> => {
  const { warningId, warningContent, updatedId } = req.body;
  try {
    const warning = await prisma.user_warnings.findUnique({
      where: {
        id: Number(warningId),
      },
    });
    const existingWarning = await checkThingExists404(res, warning, "Warning");
    if (!existingWarning) return;

    const existingWarningContent = await checkThingExists404(
      res,
      warningContent,
      "Warning content"
    );
    if (!existingWarningContent) return;

    const updatedWarning = await prisma.user_warnings.update({
      where: {
        id: Number(warningId),
      },
      data: {
        warning: warningContent,
        updated_by: updatedId,
        updated_at: new Date(),
      },
    });
    status200Send(res, updatedWarning);
  } catch (err) {
    // status500(res);
    res.json({ err });
  }
};
const deleteWarning = async (req: Request, res: Response): Promise<void> => {
  const { warningId } = req.body;
  try {
    const warning = await prisma.user_warnings.findUnique({
      where: {
        id: Number(warningId),
      },
    });
    const existingWarning = await checkThingExists404(res, warning, "Warning");
    if (!existingWarning) return;

    await prisma.user_warnings.delete({
      where: {
        id: Number(warningId),
      },
    });
    status200Message(res, "Warning successfully deleted");
  } catch (err) {
    status500(res);
  }
};

const deleteWarningsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    await prisma.user_warnings.deleteMany({
      where: {
        user_id: Number(userId),
      },
    });
    status200Message(res, "Warnings successfully deleted");
  } catch (err) {
    status500(res);
  }
};

export {
  createWarning,
  getWarningsByUserId,
  getWarningsByGaveBy,
  updateWarning,
  deleteWarning,
  deleteWarningsByUserId,
};
