/// CREATE | READ | DELETE ///
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const createFollower = async (req: Request, res: Response): Promise<void> => {
  const { followerId, followingId } = req.body;
  try {
    const existingFollower = await prisma.users.findUnique({
      where: {
        id: Number(followerId),
      },
    });
    if (!existingFollower) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Follower not found",
        },
      });
    }

    const existingFollowing = await prisma.users.findUnique({
      where: {
        id: Number(followingId),
      },
    });
    if (!existingFollowing) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Following not found",
        },
      });
    }

    const existingFollow = await prisma.followers.findFirst({
      where: {
        AND: [
          { follower_id: Number(followerId) },
          { following_id: Number(followingId) },
        ],
      },
    });

    if (existingFollow) {
      res.status(409).json({
        data: {
          status: 409,
          message: "Follow already exists",
        },
      });
      return;
    }

    const createdFollower = await prisma.followers.create({
      data: {
        follower_id: Number(followerId),
        following_id: Number(followingId),
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        createdFollower,
      },
    });
  } catch (err) {
    res.status(500).json({
      data: {
        status: 404,
        message: "Error fetching data",
      },
    });
  }
};

const getFollowingsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { followerId } = req.body;
  try {
    const existingFollower = await prisma.users.findUnique({
      where: {
        id: Number(followerId),
      },
    });
    if (!existingFollower) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Follower not found",
        },
      });
    }

    const followings = await prisma.followers.findMany({
      where: {
        follower_id: Number(followerId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        followings,
      },
    });
  } catch (err) {
    res.status(500).json({
      data: {
        status: 404,
        message: "Error fetching data",
      },
    });
  }
};

const getFollowersById = async (req: Request, res: Response): Promise<void> => {
  const { followingId } = req.body;
  try {
    const existingFollowing = await prisma.users.findUnique({
      where: {
        id: Number(followingId),
      },
    });
    if (!existingFollowing) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Following not found",
        },
      });
    }
    const followers = await prisma.followers.findMany({
      where: {
        following_id: Number(followingId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        followers,
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

const deleteFollower = async (req: Request, res: Response) => {
  const { followId } = req.body;
  try {
    await prisma.followers.delete({
      where: {
        id: Number(followId),
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        message: "Follow deleted successfully",
      },
    });
  } catch (err) {
    res.status(500).json({
      data: {
        status: 404,
        message: "Error fetching data",
      },
    });
  }
};

export { createFollower, getFollowingsById, getFollowersById, deleteFollower };
