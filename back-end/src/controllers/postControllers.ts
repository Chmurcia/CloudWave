import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";
import {
  status200Message,
  status200Send,
  status500,
} from "../../utils/helpers/status.js";
import {
  checkThingExists404,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";

const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, content, image_url, video_url, isShared } = req.body;

    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const createdPost = await prisma.posts.create({
      data: {
        user_id: userId,
        content,
        image_url,
        video_url,
        is_shared: isShared,
      },
    });

    status200Send(res, createdPost);
  } catch (err) {
    status500(res);
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    status200Send(res, posts);
  } catch (err) {
    status500(res);
  }
};

const getPostsById = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const posts = await prisma.posts.findMany({
      where: { user_id: Number(userId) },
      orderBy: {
        created_at: "desc",
      },
    });

    status200Send(res, posts);
  } catch (err) {
    status500(res);
  }
};

const getPostById = async (req: Request, res: Response) => {
  const { postId } = req.body;
  try {
    const post = await prisma.posts.findUnique({
      where: { id: Number(postId) },
    });
    const existingPost = await checkThingExists404(res, post, "Post");
    if (!existingPost) return;

    status200Send(res, post);
  } catch (err) {
    status500(res);
  }
};

const updatePost = async (req: Request, res: Response) => {
  const { postId, content, image_url, video_url } = req.body;
  try {
    const post = await prisma.posts.findUnique({
      where: { id: Number(postId) },
    });
    const existingPost = await checkThingExists404(res, post, "Post");
    if (!existingPost) return;

    const updatedPost = await prisma.posts.update({
      where: { id: Number(postId) },
      data: {
        content,
        image_url,
        video_url,
      },
    });

    status200Send(res, updatedPost);
  } catch (err) {
    status500(res);
  }
};

const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.body;
  try {
    const post = await prisma.posts.findUnique({
      where: { id: Number(postId) },
    });
    const existingPost = await checkThingExists404(res, post, "Post");
    if (!existingPost) return;

    await prisma.posts.delete({
      where: { id: Number(postId) },
    });

    status200Message(res, "Post deleted successfully");
  } catch (err) {
    status500(res);
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
