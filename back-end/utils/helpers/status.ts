import { Response } from "express";

const status200Send = async <T>(res: Response, resources: T) => {
  res.status(200).json({
    data: {
      status: 200,
      resources,
    },
  });
};

const status200Message = async (res: Response, message: string) => {
  res.status(200).json({
    data: {
      status: 200,
      message,
    },
  });
};

const status500 = async <T>(res: Response) => {
  res.status(500).json({
    data: {
      status: 500,
      message: "Error fetching data",
    },
  });
};

export { status200Send, status200Message, status500 };
