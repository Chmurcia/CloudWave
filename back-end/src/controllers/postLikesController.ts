// CREATE | READ | DELETE
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import {
  status200Message,
  status200Send,
  status500,
} from "../../utils/helpers/status.js";
import {
  checkThingExists404,
  checkThingExists409,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";

const createPostLike = async (req: Request, res: Response): Promise<void> => {
  const { postId, userId } = req.body;
  try {
    const post = await prisma.posts.findUnique({
      where: { id: Number(postId) },
    });
    const existingPost = await checkThingExists404(res, post, "Post");
    if (!existingPost) return;

    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const like = await prisma.post_likes.findUnique({
      where: {
        post_id_user_id: {
          post_id: Number(postId),
          user_id: Number(userId),
        },
      },
    });
    const existingLike = await checkThingExists409(res, like, "Post like");
    if (existingLike) return;

    const createdLike = await prisma.post_likes.create({
      data: {
        post_id: Number(postId),
        user_id: Number(userId),
      },
    });

    status200Send(res, createdLike);
  } catch (err) {
    status500(res);
  }
};

const getPostLikeByUserId = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const post_likes = await prisma.post_likes.findMany({
      where: {
        user_id: Number(userId),
      },
    });
    const postLikes = await checkThingExists404(res, post_likes, "post Likes");
    if (!postLikes) return;

    status200Send(res, post_likes);
  } catch (err) {
    status500(res);
  }
};

const getPostLikeByPostId = async (req: Request, res: Response) => {
  const { postId } = req.body;
  try {
    const post = await prisma.posts.findUnique({
      where: {
        id: Number(postId),
      },
    });
    const existingPost = await checkThingExists404(res, post, "Post");
    if (!existingPost) return;

    const postLikes = await prisma.post_likes.findMany({
      where: {
        post_id: Number(postId),
      },
    });

    status200Send(res, postLikes);
  } catch (err) {
    status500(res);
  }
};

const deletePostLike = async (req: Request, res: Response): Promise<void> => {
  const { postLikeId } = req.body;
  try {
    const postLike = await prisma.post_likes.findUnique({
      where: {
        id: Number(postLikeId),
      },
    });

    const existingPostLike = await checkThingExists404(
      res,
      postLike,
      "Post like"
    );
    if (!existingPostLike) return;

    await prisma.post_likes.delete({
      where: {
        id: Number(postLikeId),
      },
    });

    status200Message(res, "Post like deleted successfully");
  } catch (err) {
    status500(res);
  }
};

export {
  createPostLike,
  getPostLikeByUserId,
  getPostLikeByPostId,
  deletePostLike,
};
