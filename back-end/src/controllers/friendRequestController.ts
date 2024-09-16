// CREATE | READ | DELETE

import { Request, Response } from "express";
import prisma from "../prisma/prismaClient.js";

const createFriendRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { senderId, receiverId, status } = req.body;
  try {
    const existingSender = await prisma.users.findUnique({
      where: { id: Number(senderId) },
    });

    if (!existingSender) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Sender not found",
        },
      });
      return;
    }

    const existingReceiver = await prisma.users.findUnique({
      where: { id: Number(receiverId) },
    });

    if (!existingReceiver) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Receiver not found",
        },
      });
      return;
    }

    const existingRequest = await prisma.friend_requests.findUnique({
      where: {
        sender_id_receiver_id: {
          sender_id: Number(senderId),
          receiver_id: Number(receiverId),
        },
      },
    });

    if (existingRequest) {
      res.status(409).json({
        status: 409,
        message: "Request already exists",
      });
      return;
    }

    const friend_request = await prisma.friend_requests.create({
      data: {
        sender_id: Number(senderId),
        receiver_id: Number(receiverId),
        status,
      },
    });

    res.status(200).json({
      data: {
        status: 200,
        friend_request,
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

const getFriendRequestsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { receiverId } = req.body;
  try {
    const existingUser = await prisma.users.findUnique({
      where: {
        id: Number(receiverId),
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
    const requests = await prisma.friend_requests.findMany({
      where: {
        receiver_id: Number(receiverId),
      },
    });

    if (!requests) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Requests not found",
        },
      });
    }

    res.status(200).json({
      data: {
        status: 200,
        requests,
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

const deleteFriendRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { friendRequestId } = req.body;
  try {
    const existingFriendRequest = await prisma.friend_requests.findUnique({
      where: {
        id: Number(friendRequestId),
      },
    });
    if (!existingFriendRequest) {
      res.status(404).json({
        data: {
          status: 404,
          message: "Request not found",
        },
      });
      return;
    }

    await prisma.friend_requests.delete({
      where: {
        id: Number(friendRequestId),
      },
    });
    res.status(200).json({
      data: {
        status: 200,
        message: "Friend request deleted successfully",
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
export { createFriendRequest, getFriendRequestsById, deleteFriendRequest };
