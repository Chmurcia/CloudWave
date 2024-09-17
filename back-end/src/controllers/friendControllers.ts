/// CREATE | READ | DELETE ///
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

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
    const existingUser1 = await prisma.users.findUnique({
      where: {
        id: Number(user1Id),
      },
    });
    if (!existingUser1) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User1 not found",
        },
      });
      return;
    }

    const existingUser2 = await prisma.users.findUnique({
      where: {
        id: Number(user2Id),
      },
    });
    if (!existingUser2) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User2 not found",
        },
      });
      return;
    }

    const existingFriendship1 = await prisma.friends.findFirst({
      where: {
        AND: [{ user_id: Number(user1Id) }, { friend_id: Number(user2Id) }],
      },
    });
    const existingFriendship2 = await prisma.friends.findFirst({
      where: {
        AND: [{ user_id: Number(user2Id) }, { friend_id: Number(user1Id) }],
      },
    });

    if (existingFriendship1 || existingFriendship2) {
      res.status(409).json({
        data: {
          status: 409,
          message: "Friendship already exists",
        },
      });
      return;
    }

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
    res.status(200).json({
      data: {
        status: 200,
        createdFriendship1,
        createdFriendship2,
      },
    });
  } catch (err) {
    res.status(500).json({
      data: {
        status: 500,
        message: "Error fetching data",
        err,
      },
    });
  }
};

const getFriendsById = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!existingUser) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User not found",
        },
      });
    }

    const friends = await prisma.friends.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        friends,
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
    const existingUser1 = await prisma.users.findUnique({
      where: {
        id: Number(user1Id),
      },
    });
    if (!existingUser1) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User1 not found",
        },
      });
      return;
    }

    const existingUser2 = await prisma.users.findUnique({
      where: {
        id: Number(user2Id),
      },
    });
    if (!existingUser2) {
      res.status(404).json({
        data: {
          status: 404,
          message: "User2 not found",
        },
      });
      return;
    }

    const existingFriendship1 = await prisma.friends.findFirst({
      where: {
        AND: [{ user_id: Number(user1Id) }, { friend_id: Number(user2Id) }],
      },
    });
    const existingFriendship2 = await prisma.friends.findFirst({
      where: {
        AND: [{ user_id: Number(user2Id) }, { friend_id: Number(user1Id) }],
      },
    });

    if (!existingFriendship1 || !existingFriendship2) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Friendship not found",
        },
      });
      return;
    }
    await prisma.friends.delete({
      where: {
        id: Number(existingFriendship1.id),
      },
    });
    await prisma.friends.delete({
      where: {
        id: Number(existingFriendship2.id),
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        message: "Friendship deleted unfortunatelly",
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

export { createFriend, getFriendsById, deleteFriend };
