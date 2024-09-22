import { Response } from "express";
import prisma from "../../src/prisma/prismaClient.js";

const checkUserExists = async (
  res: Response,
  id: number,
  difUserName: string = "User"
) => {
  const existingUser = await prisma.users.findUnique({ where: { id } });
  if (!existingUser) {
    res.status(404).json({
      data: {
        status: 404,
        message: "User not found",
      },
    });
    return null;
  }
  return existingUser;
};

const checkThingExists400 = async <T>(
  res: Response,
  thing: T,
  thingName: string
) => {
  if (!thing) {
    res.status(400).json({
      data: {
        status: 400,
        message: `${thingName} is required`,
      },
    });
    return null;
  }
  return thing;
};

const checkThingExists404 = async <T>(
  res: Response,
  thing: T,
  thingName: string
) => {
  if (!thing) {
    res.status(404).json({
      data: {
        status: 404,
        message: `${thingName} not found`,
      },
    });
    return null;
  }
  return thing;
};

const checkThingExists409 = async <T>(
  res: Response,
  thing: T | null,
  thingName: string
) => {
  if (thing) {
    res.status(409).json({
      data: {
        status: 409,
        message: `${thingName} already exists`,
      },
    });
    return thing;
  }
  return null;
};

export {
  checkUserExists,
  checkThingExists400,
  checkThingExists404,
  checkThingExists409,
};
