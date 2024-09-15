import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import { comparePassword, hashPassword } from "../../utils/auth.utils.js";
import { generateToken } from "../../utils/jwt.utils.js";

// createUser FOR SIGNING-UP NEW USERS
// BOTH USERNAME & EMAIL MUST BE UNIQUE
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // RECEIVING DATA
    const { username, email, password } = req.body;

    // LOOKING FOR AN USER WITH GIVEN EMAIL
    const existingUserByEmail = await prisma.users.findUnique({
      where: { email },
    });

    // IF USER EXISTS - RETURN RES STATUS 400 & MESSAGE
    if (existingUserByEmail) {
      res.status(400).json({
        data: {
          status: 400,
          message: "Email already in use",
        },
      });
      return;
    }

    // LOOKING FOR A USER WITH GIVEN USERNAME
    const existingUserByUsername = await prisma.users.findUnique({
      where: { username },
    });

    // IF USER EXISTS - RETURN RES STATUS 400 & MESSAGE
    if (existingUserByUsername) {
      res.status(400).json({
        data: {
          status: 400,
          message: "Username already in use",
        },
      });
      return;
    }

    // HASING A PASSWORD
    const hashedPassword: string = await hashPassword(password);

    // IF EVERYTHING IS OK - CREATE USER IN DB THROUGH PRISMA
    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const userSettings = await prisma.user_settings.create({
      data: {
        user_id: user.id,
        theme: "dark",
        notifications_enabled: true,
        language: "en",
        profile_visibility: "public",
        status: "",
        activity_tracking: false,
      },
    });

    // IF EVERYTHING IS OK - CREATE USER AND RETURN JSON WITH STATUS, MESSAGE & CREATED USER
    res.status(201).json({
      data: {
        status: 201,
        message: "User created successfully",
        user,
        userSettings,
      },
    });
  } catch (err) {
    //IF ERROR - SEND RES STATUS 500 DUE TO SERVER ERROR
    res.status(500).json({
      data: {
        status: 500,
        message: "Error logging in",
      },
    });
  }
};

// LOGIN USER
const signInUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) {
      res.status(401).json({
        data: {
          status: 401,
          message: "Invalid username",
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

    const token = generateToken(user.id);

    res.status(200).json({
      status: 200,
      message: "Login successful",
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({
      data: {
        status: 500,
        message: "Error signing in",
        err,
      },
    });
  }
};

// CHANGE PASSWORD
const changePassword = async (req: Request, res: Response): Promise<void> => {
  const { id, currentPassword, newPassword } = req.body;
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

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      res.status(400).json({
        data: {
          status: 400,
          message: "Password is incorrect",
        },
      });
      return;
    }

    const oldPassword = user.password;
    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = await prisma.users.update({
      where: { id: Number(id) },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedUser,
        oldPassword,
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

export { createUser, signInUser, changePassword };
