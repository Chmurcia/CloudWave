// CREATE | READ | DELETE //
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import { status200Send, status500 } from "../../utils/helpers/status.js";
import {
  checkThingExists404,
  checkThingExists409,
} from "../../utils/helpers/checkExists.js";

const createFollower = async (req: Request, res: Response): Promise<void> => {
  const { followerId, followingId } = req.body;
  try {
    const follower = await prisma.users.findUnique({
      where: {
        id: Number(followerId),
      },
    });
    const existingFollower = await checkThingExists404(
      res,
      follower,
      "Follower"
    );
    if (!existingFollower) return;

    const following = await prisma.users.findUnique({
      where: {
        id: Number(followingId),
      },
    });
    const existingFollowing = await checkThingExists404(
      res,
      following,
      "Following"
    );
    if (!existingFollowing) return;

    const follow = await prisma.followers.findFirst({
      where: {
        AND: [
          { follower_id: Number(followerId) },
          { following_id: Number(followingId) },
        ],
      },
    });

    const existingFollow = await checkThingExists409(res, follow, "Follow");

    if (existingFollow) return;

    const createdFollower = await prisma.followers.create({
      data: {
        follower_id: Number(followerId),
        following_id: Number(followingId),
      },
    });

    status200Send(res, createdFollower);
  } catch (err) {
    status500(res);
  }
};

const getFollowingsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { followerId } = req.body;
  try {
    const follower = await prisma.users.findUnique({
      where: {
        id: Number(followerId),
      },
    });
    const existingFollower = await checkThingExists404(
      res,
      follower,
      "Follower"
    );
    if (!existingFollower) return;

    const followings = await prisma.followers.findMany({
      where: {
        follower_id: Number(followerId),
      },
    });

    status200Send(res, followings);
  } catch (err) {
    status500(res);
  }
};

const getFollowersById = async (req: Request, res: Response): Promise<void> => {
  const { followingId } = req.body;
  try {
    const following = await prisma.users.findUnique({
      where: {
        id: Number(followingId),
      },
    });
    const existingFollowing = await checkThingExists404(
      res,
      following,
      "Following"
    );
    if (!existingFollowing) return;

    const followers = await prisma.followers.findMany({
      where: {
        following_id: Number(followingId),
      },
    });

    status200Send(res, followers);
  } catch (err) {
    status500(res);
  }
};

const deleteFollow = async (req: Request, res: Response) => {
  const { followId } = req.body;
  try {
    await prisma.followers.delete({
      where: {
        id: Number(followId),
      },
    });
    status200Send(res, "Follow deleted successfully");
  } catch (err) {
    status500(res);
  }
};

export { createFollower, getFollowingsById, getFollowersById, deleteFollow };
