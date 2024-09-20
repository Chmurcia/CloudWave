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

const createFriendRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { senderId, receiverId, status } = req.body;
  try {
    const existingSender = await checkUserExists(res, senderId, "Sender");
    if (!existingSender) return;

    const existingReceiver = await checkUserExists(res, receiverId, "Receiver");
    if (!existingReceiver) return;

    const request = await prisma.friend_requests.findUnique({
      where: {
        sender_id_receiver_id: {
          sender_id: Number(senderId),
          receiver_id: Number(receiverId),
        },
      },
    });

    const existingRequest = await checkThingExists409(res, request, "Request");
    if (existingRequest) return;

    const createdFriendRequest = await prisma.friend_requests.create({
      data: {
        sender_id: Number(senderId),
        receiver_id: Number(receiverId),
        status,
      },
    });

    status200Send(res, createdFriendRequest);
  } catch (err) {
    status500(res);
  }
};

const getFriendRequestsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { receiverId } = req.body;
  try {
    const existingReceiver = await checkUserExists(res, receiverId, "Receiver");
    if (!existingReceiver) return;

    const requests = await prisma.friend_requests.findMany({
      where: {
        receiver_id: Number(receiverId),
      },
    });

    status200Send(res, requests);
  } catch (err) {
    status500(res);
  }
};

const deleteFriendRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { friendRequestId } = req.body;
  try {
    const friendRequest = await prisma.friend_requests.findUnique({
      where: {
        id: Number(friendRequestId),
      },
    });
    const existingFriendRequest = await checkThingExists404(
      res,
      friendRequest,
      "Request"
    );
    if (!existingFriendRequest) return;

    await prisma.friend_requests.delete({
      where: {
        id: Number(friendRequestId),
      },
    });
    status200Message(res, "Friend request deleted successfully");
  } catch (err) {
    status500(res);
  }
};
export { createFriendRequest, getFriendRequestsById, deleteFriendRequest };
