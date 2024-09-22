import { Response } from "express";
import prisma from "../../src/prisma/prismaClient.js";

// TO CAPITALIZE STRINGS
const capitalize = (str: String) => str.charAt(0).toUpperCase() + str.slice(1);

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

const checkThingCUS409 = async <T>(
  res: Response,
  thing: T | null,
  thingName: string,
  state: string
) => {
  if (thing) {
    switch (state) {
      case "owner":
        res.status(409).json({
          data: {
            status: 409,
            messages: {
              message: `${capitalize(thingName)} cannot leave!`,
              addMessage: "Delete chat or give owner to someone else",
            },
          },
        });
        return thing;
      case "banned":
        if (thingName === "owner" || thingName === "moderator") {
          res.status(409).json({
            data: {
              status: 409,
              message: `${capitalize(thingName)} cannot be banned!`,
            },
          });
          return thing;
        }
        res.status(409).json({
          data: {
            status: 409,
            message: `${thingName} is banned!`,
          },
        });
        return thing;
      case "unbanned":
        res.status(409).json({
          data: {
            status: 409,
            message: `${thingName} is not banned!`,
          },
        });
        return thing;
      case "muted":
        if (thingName === "owner" || thingName === "moderator") {
          res.status(409).json({
            data: {
              status: 409,
              message: `${capitalize(thingName)} cannot be muted!`,
            },
          });
          return thing;
        }
        res.status(409).json({
          data: {
            status: 409,
            message: `${thingName} is muted!`,
          },
        });
        return thing;
      case "unmuted":
        res.status(409).json({
          data: {
            status: 409,
            message: `${thingName} is not muted!`,
          },
        });
        return thing;
    }
  }
  return null;
};

export {
  checkUserExists,
  checkThingExists400,
  checkThingExists404,
  checkThingExists409,
  checkThingCUS409,
};
//message: "Owner cannot leave!",
// addMessage: "Delete chat or give owner to someone else",
