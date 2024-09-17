// CREATE | READ | DELETE
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const createPostLike = async (req: Request, res: Response): Promise<void> => {
  const { postId, userId } = req.body;
  try {
    const existingPost = prisma.posts.findUnique({
      where: { id: Number(postId) },
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
    const existingUser = prisma.users.findUnique({
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

    const existingLike = await prisma.post_likes.findUnique({
      where: {
        post_id_user_id: {
          post_id: Number(postId),
          user_id: Number(userId),
        },
      },
    });

    if (existingLike) {
      res.status(409).json({
        data: {
          status: 409,
          message: "Post like already exists",
        },
      });
      return;
    }

    const like = await prisma.post_likes.create({
      data: {
        post_id: Number(postId),
        user_id: Number(userId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        like,
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

const getPostLikeById = async (req: Request, res: Response) => {
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
    const post_likes = await prisma.post_likes.findMany({
      where: {
        user_id: Number(userId),
      },
    });
    if (!post_likes) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Post likes not found",
        },
      });
      return;
    }
    res.status(200).json({
      data: {
        status: 200,
        post_likes,
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

const getPostLikePostId = async (req: Request, res: Response) => {
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
    const post_likes = await prisma.post_likes.findMany({
      where: {
        post_id: Number(postId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        post_likes,
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

const deletePostLike = async (req: Request, res: Response): Promise<void> => {
  const { postLikeId } = req.body;
  try {
    const existingPostLike = await prisma.post_likes.findUnique({
      where: {
        id: Number(postLikeId),
      },
    });

    if (!existingPostLike) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Post Like not found",
        },
      });
      return;
    }

    await prisma.post_likes.delete({
      where: {
        id: Number(postLikeId),
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        message: "Post like deleted successfully",
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

export { createPostLike, getPostLikeById, deletePostLike };
