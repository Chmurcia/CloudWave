import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../../utils/auth.utils.js";
import prisma from "../prisma/prismaClient.js";
import { generateToken } from "../../utils/jwt.utils.js";
import {
  status200Message,
  status200Send,
  status500,
} from "../../utils/helpers/status.js";
import {
  checkThingExists400,
  checkThingExists404,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";

// GET ALL USERS
const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.users.findMany();

    status200Send(res, users);
  } catch (err) {
    status500(res);
  }
};

// GET USER BY ID
const getUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingId = await checkThingExists400(res, Number(userId), "ID");
    if (!existingId) return;
    //
    const user = await prisma.users.findUnique({
      where: { id: Number(userId) },
    });
    const existingUser = await checkThingExists404(res, user, "User");
    if (!existingUser) return;
    //
    status200Send(res, user);
  } catch (err) {
    status500(res);
  }
};

// UPDATE USER
const updateUser = async (req: Request, res: Response): Promise<void> => {
  const {
    userId,
    username,
    firstName,
    lastName,
    email,
    bio,
    dateOfBirth,
    country,
  } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const updatedUser = await prisma.users.update({
      where: { id: Number(userId) },
      data: {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        bio,
        date_of_birth: dateOfBirth,
        country,
      },
    });

    status200Send(res, updatedUser);
  } catch (err) {
    // status500(res);
    res.status(500).json({
      err,
    });
  }
};

// DELETE USER
const deleteUser = async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const isMatch = await comparePassword(password, existingUser.password);

    if (!isMatch) {
      res.status(401).json({
        data: {
          status: 401,
          message: "Invalid password",
        },
      });
      return;
    }

    await prisma.users.delete({
      where: { id: Number(userId) },
    });

    status200Message(res, "User deleted successfully");
  } catch (err) {
    status500(res);
  }
};

// UPDATE AVATAR
const updateAvatar = async (req: Request, res: Response) => {
  const { userId, avatar_url } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const updatedUser = await prisma.users.update({
      where: { id: Number(userId) },
      data: {
        avatar_url,
      },
    });

    status200Send(res, updatedUser);
  } catch (err) {
    status500(res);
  }
};

// UPDATE BACKGROUND IMAGE
const updateBgImage = async (req: Request, res: Response) => {
  const { userId, background_image_url } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const updatedUser = await prisma.users.update({
      where: { id: Number(userId) },
      data: {
        background_image_url,
      },
    });

    status200Send(res, updatedUser);
  } catch (err) {
    status500(res);
  }
};

// IMPORTANT - Y0U D0N'T HAVE T0 MAINTAIN NO_AVATAR CASE, IT WILL BE MAINTAINED 0N FR0NT-END. THERE W0N'T BE ANY WAY T0 SEND EMPTY STRING AS AN AVATAR URL
// DELETE AVATAR
const deleteAvatar = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const updatedUser = await prisma.users.update({
      where: { id: Number(userId) },
      data: {
        avatar_url: null,
      },
    });

    status200Send(res, updatedUser);
  } catch (err) {
    status500(res);
  }
};

export {
  getAllUser,
  getUser,
  updateUser,
  updateAvatar,
  deleteUser,
  deleteAvatar,
};
