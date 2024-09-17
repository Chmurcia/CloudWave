/// CREATE | READ | DELETE ///
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const createCommentLike = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { commentId, userId } = req.body;
  try {
    const existingComment = await prisma.comments.findUnique({
      where: {
        id: Number(commentId),
      },
    });
    if (!existingComment) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Comment not found",
        },
      });
      return;
    }
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
      return;
    }

    const existingLike = await prisma.comment_likes.findFirst({
      where: {
        AND: [{ comment_id: Number(commentId) }, { user_id: Number(userId) }],
      },
    });
    if (existingLike) {
      res.status(409).json({
        data: {
          status: 409,
          message: "Like already exists",
        },
      });
      return;
    }

    const createdCommentLike = await prisma.comment_likes.create({
      data: {
        comment_id: Number(commentId),
        user_id: Number(userId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        createdCommentLike,
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

const getCommentLikesByCommentId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { commentId } = req.body;
  try {
    const existingComment = await prisma.comments.findUnique({
      where: {
        id: Number(commentId),
      },
    });
    if (!existingComment) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Comment not found",
        },
      });
      return;
    }

    const commentLikes = await prisma.comment_likes.findMany({
      where: {
        comment_id: Number(commentId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        commentLikes,
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

const getCommentLikesByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
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
      return;
    }

    const commentLikes = await prisma.comment_likes.findMany({
      where: {
        user_id: Number(userId),
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        commentLikes,
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

const deleteCommentLike = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {} = req.body;
  try {
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
  createCommentLike,
  getCommentLikesByUserId,
  getCommentLikesByCommentId,
  deleteCommentLike,
};
