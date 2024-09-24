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

const createExtLink = async (req: Request, res: Response): Promise<void> => {
  const { userId, url, description, icon } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const existingContent = await checkThingExists400(
      res,
      url || icon,
      "Link's info"
    );
    if (!existingContent) return;

    const createdExtLink = await prisma.ext_links.create({
      data: {
        user_id: userId,
        url,
        description,
        icon,
      },
    });
    status200Send(res, createdExtLink);
  } catch (err) {
    status500(res);
  }
};

const getExtLinksByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const extLinks = await prisma.ext_links.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    status200Send(res, extLinks);
  } catch (err) {
    status500(res);
  }
};

const updateExtLink = async (req: Request, res: Response): Promise<void> => {
  const { linkId, url, description, icon } = req.body;
  const existingContent = await checkThingExists400(
    res,
    url || icon,
    "Link's info"
  );
  if (!existingContent) return;

  const updatedExtLink = await prisma.ext_links.update({
    where: {
      id: Number(linkId),
    },
    data: {
      url,
      description,
      icon,
    },
  });

  status200Send(res, updatedExtLink);
  try {
  } catch (err) {
    status500(res);
  }
};

const deleteExtLink = async (req: Request, res: Response): Promise<void> => {
  const { linkId } = req.body;
  try {
    const link = await prisma.ext_links.findUnique({
      where: {
        id: Number(linkId),
      },
    });
    const existingLink = await checkThingExists404(res, link, "External link");
    if (!existingLink) return;

    await prisma.ext_links.delete({
      where: {
        id: Number(linkId),
      },
    });

    status200Message(res, "External link deleted successfully");
  } catch (err) {
    status500(res);
  }
};

export { createExtLink, getExtLinksByUserId, updateExtLink, deleteExtLink };
