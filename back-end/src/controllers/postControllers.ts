import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const createPost = async (req: Request, res: Response) => {
  const { id, content, image_url, video_url } = req.body;

  const existingUser = await prisma.users.findUnique({
    where: { id: Number(id) },
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

  const createdPost = await prisma.posts.create({
    data: {
      user_id: id,
      content,
      image_url,
      video_url,
    },
  });

  res.status(200).json({
    data: {
      status: 200,
      createdPost,
    },
  });

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

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        posts,
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

const getPostsById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({
      where: { id: Number(id) },
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

    const posts = await prisma.posts.findMany({
      where: { user_id: Number(id) },
      orderBy: {
        created_at: "desc",
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        posts,
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

const getPostById = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const post = await prisma.posts.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Post not found",
        },
      });
      return;
    }
    res.status(200).json({
      data: {
        status: 200,
        post,
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

const updatePost = async (req: Request, res: Response) => {
  const { postId, content, image_url, video_url } = req.body;
  try {
    const existingPost = await prisma.posts.findUnique({
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
    const updatedPost = await prisma.posts.update({
      where: { id: Number(postId) },
      data: {
        content,
        image_url,
        video_url,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        updatedPost,
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

const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.body;
  try {
    const existingPost = await prisma.posts.findUnique({
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
    await prisma.posts.delete({
      where: { id: Number(postId) },
    });

    res.status(200).json({
      data: {
        status: 200,
        message: "Post deleted successfully",
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
  createPost,
  getPostsById,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
