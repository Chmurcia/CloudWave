/// CREATE | READ | DELETE ///
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import {
  checkThingExists404,
  checkThingExists409,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";
import { status200Send, status500 } from "../../utils/helpers/status.js";

const createFriend = async (req: Request, res: Response) => {
  const { user1Id, user2Id } = req.body;
  try {
    if (user1Id === user2Id) {
      res.status(409).json({
        data: {
          status: 409,
          message: "user1Id cannot be equal user2Id",
        },
      });
      return;
    }

    const existingUser1 = await checkUserExists(res, user1Id, "User1");
    if (!existingUser1) return;

    const existingUser2 = await checkUserExists(res, user1Id, "User2");
    if (!existingUser2) return;

    const friendship1 = await prisma.friends.findFirst({
      where: {
        AND: [{ user_id: Number(user1Id) }, { friend_id: Number(user2Id) }],
      },
    });
    const friendship2 = await prisma.friends.findFirst({
      where: {
        AND: [{ user_id: Number(user2Id) }, { friend_id: Number(user1Id) }],
      },
    });

    const existingFriendship = await checkThingExists409(
      res,
      friendship1 || friendship2,
      "Friendship"
    );
    if (existingFriendship) return;

    const createdFriendship1 = await prisma.friends.create({
      data: {
        user_id: Number(user1Id),
        friend_id: Number(user2Id),
      },
    });
    const createdFriendship2 = await prisma.friends.create({
      data: {
        user_id: Number(user2Id),
        friend_id: Number(user1Id),
      },
    });

    status200Send(res, {
      createdFriendship: { createdFriendship1, createdFriendship2 },
    });
  } catch (err) {
    status500(res);
  }
};

const getFriendsById = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, userId);
    if (!existingUser) return;

    const friends = await prisma.friends.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    status200Send(res, friends);
  } catch (err) {
    status500(res);
  }
};

const deleteFriend = async (req: Request, res: Response) => {
  const { user1Id, user2Id } = req.body;
  try {
    if (user1Id === user2Id) {
      res.status(409).json({
        data: {
          status: 409,
          message: "user1Id cannot be equal user2Id",
        },
      });
      return;
    }
    const existingUser1 = await checkUserExists(res, user1Id, "User1");
    if (!existingUser1) return;

    const existingUser2 = await checkUserExists(res, user2Id, "User2");
    if (!existingUser2) return;

    const friendship1 = await prisma.friends.findFirst({
      where: {
        AND: [{ user_id: Number(user1Id) }, { friend_id: Number(user2Id) }],
      },
    });
    const friendship2 = await prisma.friends.findFirst({
      where: {
        AND: [{ user_id: Number(user2Id) }, { friend_id: Number(user1Id) }],
      },
    });

    const existingFriendship = await checkThingExists404(
      res,
      !friendship1 || !friendship2,
      "Friendship"
    );
    if (!existingFriendship) return;

    await prisma.friends.delete({
      where: {
        id: Number(friendship1!.id),
      },
    });
    await prisma.friends.delete({
      where: {
        id: Number(friendship2!.id),
      },
    });

    status200Send(res, "Friendship deleted unfortunatelly");
  } catch (err) {
    status500(res);
  }
};

export { createFriend, getFriendsById, deleteFriend };
