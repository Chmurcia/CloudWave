import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../../utils/auth.utils.js";
import prisma from "../prisma/prismaClient.js";
import { generateToken } from "../../utils/jwt.utils.js";

// GET ALL USERS
const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.users.findMany();

    res.status(200).json({
      data: {
        status: 200,
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      data: {
        status: 500,
        message: "Error fetching users",
      },
    });
  }
};

// GET USER BY ID
const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  try {
    if (!id) {
      res.status(400).json({
        data: {
          status: 400,
          message: "ID is required",
        },
      });
    }

    const user = await prisma.users.findUnique({ where: { id: Number(id) } });

    if (!user) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
      return;
    }

    res.status(200).json({
      data: {
        status: 200,
        user,
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

// UPDATE USER
const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id, username, email, bio } = req.body;
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
      return;
    }

    const updatedUser = await prisma.users.update({
      where: { id: Number(id) },
      data: {
        username,
        email,
        bio,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedUser,
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

const deleteUser = async (req: Request, res: Response) => {
  const { id, password } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
      return;
    }

    const isMatch = await comparePassword(password, user.password);

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
      where: { id: Number(id) },
    });

    res.status(200).json({
      data: {
        status: 200,
        message: "User deleted successfully",
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

// UPDATE AVATAR
const updateAvatar = async (req: Request, res: Response) => {
  const { id, avatar_url } = req.body;
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
      return;
    }

    const updatedUser = await prisma.users.update({
      where: { id: Number(id) },
      data: {
        avatar_url,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedUser,
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

// IMPORTANT - Y0U D0N'T HAVE T0 MAINTAIN NO_AVATAR CASE, IT WILL BE MAINTAINED 0N FR0NT-END. THERE W0N'T BE ANY WAY T0 SEND EMPTY STRING AS AN AVATAR URL
// DELETE AVATAR
const deleteAvatar = async (req: Request, res: Response): Promise<void> => {
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
      return;
    }

    const updatedUser = await prisma.users.update({
      where: { id: Number(id) },
      data: {
        avatar_url: null,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedUser,
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
  getAllUser,
  getUser,
  updateUser,
  updateAvatar,
  deleteUser,
  deleteAvatar,
};
