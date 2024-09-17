/// CREATE | READ | UPDATE | DELETE ///
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const createComment = async (req: Request, res: Response): Promise<void> => {
  const { userId, postId, content, imageUrl, videoUrl } = req.body;
  try {
    if (!content) {
      res.status(400).json({
        data: {
          status: 400,
          message: "Content not provided",
        },
      });
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

    const existingPost = await prisma.posts.findUnique({
      where: {
        id: Number(postId),
      },
    });
    if (!existingPost) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Post not found",
        },
      });
    }

    const createdComment = await prisma.comments.create({
      data: {
        user_id: Number(userId),
        post_id: Number(postId),
        content,
        image_url: imageUrl,
        video_url: videoUrl,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        createdComment,
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

const getCommentsByPostId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { postId } = req.body;
  try {
    const existingPost = await prisma.posts.findUnique({
      where: {
        id: Number(postId),
      },
    });
    if (!existingPost) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Post not found",
        },
      });
      return;
    }

    const comments = await prisma.comments.findMany({
      where: {
        post_id: Number(postId),
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        comments,
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

const getCommentsByUserId = async (
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

    const comments = await prisma.comments.findMany({
      where: {
        user_id: Number(userId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        comments,
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

const deleteComment = async (req: Request, res: Response): Promise<void> => {
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

    await prisma.comments.delete({
      where: {
        id: Number(commentId),
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        message: "Comment deleted successfully",
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

export {
  createComment,
  getCommentsByUserId,
  getCommentsByPostId,
  deleteComment,
};
