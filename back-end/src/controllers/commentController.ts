/// CREATE | READ | UPDATE | DELETE ///
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
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

const createComment = async (req: Request, res: Response): Promise<void> => {
  const { userId, postId, content, imageUrl, videoUrl } = req.body;
  try {
    const existingContent = await checkThingExists400(res, content, "Content");
    if (!existingContent) return;

    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const post = await prisma.posts.findUnique({
      where: {
        id: Number(postId),
      },
    });

    const existingPost = await checkThingExists404(res, post, "Post");
    if (!existingPost) return;

    const createdComment = await prisma.comments.create({
      data: {
        user_id: Number(userId),
        post_id: Number(postId),
        content,
        image_url: imageUrl,
        video_url: videoUrl,
      },
    });

    status200Send(res, createdComment);
  } catch (err) {
    status500(res);
  }
};

const getCommentsByPostId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { postId } = req.body;
  try {
    const post = await prisma.posts.findUnique({
      where: {
        id: Number(postId),
      },
    });

    const existingPost = await checkThingExists404(res, post, "Post");
    if (!existingPost) return;

    const comments = await prisma.comments.findMany({
      where: {
        post_id: Number(postId),
      },
    });

    status200Send(res, comments);
  } catch (err) {
    status500(res);
  }
};

const getCommentsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: Number(userId),
      },
    });
    const existingUser = await checkThingExists404(res, user, "User");

    if (!existingUser) return;

    const comments = await prisma.comments.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    status200Send(res, comments);
  } catch (err) {
    status500(res);
  }
};

const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const { commentId } = req.body;
  try {
    const comment = await prisma.comments.findUnique({
      where: {
        id: Number(commentId),
      },
    });
    const existingComment = await checkThingExists404(res, comment, "Comment");
    if (!existingComment) return;

    await prisma.comments.delete({
      where: {
        id: Number(commentId),
      },
    });

    status200Message(res, "Comment deleted successfully");
  } catch (err) {
    status500(res);
  }
};

export {
  createComment,
  getCommentsByUserId,
  getCommentsByPostId,
  deleteComment,
};
