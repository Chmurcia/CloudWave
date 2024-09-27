// CREATE | READ | UPDATE | DELETE

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
  checkThingExists409,
  checkUserExists,
} from "../../utils/helpers/checkExists.js";

const createIsPrivate = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const isPrivate = await prisma.is_private.findUnique({
      where: {
        user_id: Number(userId),
      },
    });
    const existingIsPrivate = await checkThingExists409(
      res,
      isPrivate,
      "isPrivate"
    );
    if (existingIsPrivate) return;

    const createdPrivacy = await prisma.is_private.create({
      data: {
        user_id: Number(userId),
      },
    });
    status200Send(res, createdPrivacy);
  } catch (err) {
    status500(res);
  }
};

const createSeePostsPermission = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { viewerId, userId } = req.body;
  try {
    const existingViewer = await checkUserExists(
      res,
      Number(viewerId),
      "Viewer"
    );
    if (!existingViewer) return;

    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const SeePostsPermission = await prisma.can_see_posts.findFirst({
      where: {
        AND: [{ viewer_id: Number(viewerId) }, { viewed_id: Number(userId) }],
      },
    });
    const existingSeePostsPermission = await checkThingExists409(
      res,
      SeePostsPermission,
      "Permission"
    );
    if (existingSeePostsPermission) return;

    const createdPermission = await prisma.can_see_posts.create({
      data: {
        viewer_id: Number(viewerId),
        viewed_id: Number(userId),
      },
    });
    status200Send(res, createdPermission);
  } catch (err) {
    status500(res);
  }
};

const getIsPrivateByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const isPrivate = await prisma.is_private.findUnique({
      where: {
        user_id: Number(userId),
      },
    });
    status200Send(res, isPrivate);
  } catch (err) {
    status500(res);
  }
};

const getSeePostsPermissionByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const canSeePostsPermission = await prisma.can_see_posts.findMany({
      where: {
        viewed_id: Number(userId),
      },
    });

    status200Send(res, canSeePostsPermission);
  } catch (err) {
    status500(res);
  }
};

const updateIsPrivate = async (req: Request, res: Response): Promise<void> => {
  const { userId, info, friends, profile, following, followers } = req.body;
  try {
    const existingInfo = await checkThingExists400(
      res,
      typeof info === "boolean" &&
        typeof friends === "boolean" &&
        typeof profile === "boolean" &&
        typeof following === "boolean" &&
        typeof followers === "boolean",
      "Important info"
    );
    if (!existingInfo) return;

    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const updatedIsPrivate = await prisma.is_private.update({
      where: {
        user_id: Number(userId),
      },
      data: {
        info,
        friends,
        profile,
        following,
        followers,
      },
    });
    status200Send(res, updatedIsPrivate);
  } catch (err) {
    status500(res);
  }
};

const deleteIsPrivate = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    await prisma.is_private.delete({
      where: {
        user_id: Number(userId),
      },
    });
    status200Message(res, "IsPrivate successfully deleted");
  } catch (err) {
    status500(res);
  }
};

const deleteCanSeePosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  // :(

  const { viewerId, userId } = req.body;
  try {
    const existingViewer = await checkUserExists(
      res,
      Number(viewerId),
      "Viewer"
    );
    if (!existingViewer) return;

    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const SeePostsPermission = await prisma.can_see_posts.findFirst({
      where: {
        AND: [{ viewer_id: Number(viewerId) }, { viewed_id: Number(userId) }],
      },
    });
    const existingPermission = await checkThingExists404(
      res,
      SeePostsPermission,
      "Permission"
    );
    if (!existingPermission) return;

    await prisma.can_see_posts.delete({
      where: {
        id: Number(SeePostsPermission!.id),
      },
    });
    status200Message(res, "Permission successfully deleted");
  } catch (err) {
    status500(res);
  }
};

export {
  createIsPrivate,
  createSeePostsPermission,
  getIsPrivateByUserId,
  getSeePostsPermissionByUserId,
  updateIsPrivate,
  deleteIsPrivate,
  deleteCanSeePosts,
};
