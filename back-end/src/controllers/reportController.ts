// CREATE | READ | UPDATE | DELETE

enum statusType {
  "PENDING",
  "RESOLVING",
  "RESOLVED",
  "REJECTED",
}

enum reportType {
  "POST",
  "COMMENT",
  "MESSAGE",
  "PROFILE",
  "REPLY",
}

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

const createReport = async (req: Request, res: Response): Promise<void> => {
  const { reporterId, reportedId, type, referenceId, reason } = req.body;
  try {
    if (!Object.values(reportType).includes(type)) {
      res.status(400).json({
        data: {
          status: 400,
          message: "Invalid report type",
        },
      });
      return;
    }

    const existingReporter = await checkUserExists(
      res,
      Number(reporterId),
      "Reporter"
    );
    if (!existingReporter) return;

    const existingReported = await checkUserExists(
      res,
      Number(reportedId),
      "Reported"
    );
    if (!existingReported) return;

    const createdReport = await prisma.reports.create({
      data: {
        reporter_id: Number(reporterId),
        reported_id: Number(reportedId),
        type: type,
        reference_id: Number(referenceId),
        reason: reason,
        status: "PENDING",
      },
    });
    status200Send(res, createdReport);
  } catch (err) {
    status500(res);
  }
};

const getReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const reports = await prisma.reports.findMany();
    status200Send(res, reports);
  } catch (err) {
    status500(res);
  }
};

const getPendingReports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reports = await prisma.reports.findMany({
      where: {
        status: "PENDING",
      },
    });
    status200Send(res, reports);
  } catch (err) {
    status500(res);
  }
};

const getResolvedReports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reports = await prisma.reports.findMany({
      where: {
        status: "RESOLVED",
      },
    });
    status200Send(res, reports);
  } catch (err) {
    status500(res);
  }
};

const getRejectedReports = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const reports = await prisma.reports.findMany({
      where: {
        status: "REJECTED",
      },
    });
    status200Send(res, reports);
  } catch (err) {
    status500(res);
  }
};

const getReportsByAnsweredId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { answeredId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(answeredId));
    if (!existingUser) return;

    const reports = await prisma.reports.findMany({
      where: {
        answered_by: Number(answeredId),
      },
    });

    status200Send(res, reports);
  } catch (err) {
    status500(res);
  }
};

const getReportsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;
  try {
    const existingUser = await checkUserExists(res, Number(userId));
    if (!existingUser) return;

    const reports = await prisma.reports.findMany({
      where: {
        reporter_id: Number(userId),
      },
    });

    status200Send(res, reports);
  } catch (err) {
    status500(res);
  }
};

const updateReport = async (req: Request, res: Response): Promise<void> => {
  const { reportId, status, answer, answeredId } = req.body;
  try {
    if (!Object.values(statusType).includes(status)) {
      res.status(400).json({
        data: {
          status: 400,
          message: "Invalid status type",
        },
      });
      return;
    }

    const existingUser = await checkUserExists(res, Number(answeredId));
    if (!existingUser) return;

    if (status !== "RESOLVING") {
      const existingAnswer = await checkThingExists400(
        res,
        answer !== "",
        "Answer"
      );
      if (!existingAnswer) return;
    }

    const report = await prisma.reports.findUnique({
      where: {
        id: Number(reportId),
      },
    });

    const existingReport = await checkThingExists404(res, report, "Report");
    if (!existingReport) return;

    const existingStatus = await checkThingExists400(res, status, "Status");
    if (!existingStatus) return;

    const updatedReport = await prisma.reports.update({
      where: {
        id: Number(reportId),
      },
      data: {
        answered_by: answeredId,
        status,
        answer,
      },
    });

    status200Send(res, updatedReport);
  } catch (err) {
    status500(res);
  }
};

const deleteReport = async (req: Request, res: Response): Promise<void> => {
  const { reportId } = req.body;
  try {
    const status = await prisma.reports.findUnique({
      where: {
        id: Number(reportId),
      },
    });
    const existingStatus = await checkThingExists404(res, status, "Status");
    if (!existingStatus) return;

    await prisma.reports.delete({
      where: {
        id: Number(reportId),
      },
    });

    status200Message(res, "Report successfully deleted");
  } catch (err) {
    status500(res);
  }
};

export {
  createReport,
  getReports,
  getPendingReports,
  getResolvedReports,
  getRejectedReports,
  getReportsByAnsweredId,
  getReportsByUserId,
  updateReport,
  deleteReport,
};
