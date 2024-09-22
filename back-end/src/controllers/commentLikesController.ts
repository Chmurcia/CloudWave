/// CREATE | READ | DELETE ///
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import {
  checkThingExists404,
  checkThingExists409,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";
import {
  status200Message,
  status200Send,
  status500,
} from "../../utils/helpers/status.js";

const createCommentLike = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { commentId, userId } = req.body;
  try {
    const comment = await prisma.comments.findUnique({
      where: {
        id: Number(commentId),
      },
    });

    const existingComment = await checkThingExists404(res, comment, "Comment");
    if (!existingComment) return;

    const existingUser = checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const like = await prisma.comment_likes.findFirst({
      where: {
        AND: [{ comment_id: Number(commentId) }, { user_id: Number(userId) }],
      },
    });
    const existingLike = await checkThingExists409(res, like, "Comment like");
    if (existingLike) return;

    const createdCommentLike = await prisma.comment_likes.create({
      data: {
        comment_id: Number(commentId),
        user_id: Number(userId),
      },
    });

    status200Send(res, createdCommentLike);
  } catch (err) {
    status500(res);
  }
};

const getCommentLikesByCommentId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { commentId } = req.body;
  try {
    const comment = await prisma.comments.findUnique({
      where: {
        id: Number(commentId),
      },
    });

    const existingComment = await checkThingExists404(res, comment, "Comments");

    if (!existingComment) return;

    const commentLikes = await prisma.comment_likes.findMany({
      where: {
        comment_id: Number(commentId),
      },
    });

    status200Send(res, commentLikes);
  } catch (err) {
    status500(res);
  }
};

const getCommentLikesByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const commentLikes = await prisma.comment_likes.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    status200Send(res, commentLikes);
  } catch (err) {
    status500(res);
  }
};

const deleteCommentLike = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { commentLikeId } = req.body;
  try {
    const commentLike = await prisma.message_likes.findUnique({
      where: {
        id: Number(commentLikeId),
      },
    });
    const existingCommentLike = checkThingExists404(
      res,
      commentLike,
      "Comment like"
    );
    if (!existingCommentLike) return;

    await prisma.message_likes.delete({
      where: {
        id: Number(commentLikeId),
      },
    });

    status200Message(res, "Comment like successfully deleted");
  } catch (err) {
    status500(res);
  }
};

export {
  createCommentLike,
  getCommentLikesByUserId,
  getCommentLikesByCommentId,
  deleteCommentLike,
};
