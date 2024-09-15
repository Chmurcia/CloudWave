import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../../utils/auth.utils.js";
import prisma from "../prisma/prismaClient.js";
import { generateToken } from "../../utils/jwt.utils.js";

//createUser FOR SIGNING-UP NEW USERS
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

    // IF EVERYTHING IS OK - CREATE USER AND RETURN JSON WITH STATUS, MESSAGE & CREATED USER
    res.status(201).json({
      data: {
        status: 201,
        message: "User created successfully",
        user,
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

// TEST getUser TO GET ALL USER IN JSON!
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

    const ifPasswordValid = await comparePassword(password, user.password);

    if (!ifPasswordValid) {
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

export { createUser, getAllUser, signInUser };
