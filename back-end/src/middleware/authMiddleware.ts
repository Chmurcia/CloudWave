import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../utils/jwt.utils.js";

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      data: {
        status: 401,
        message: "No token provided",
      },
    });
    return;
  }

  const user = verifyToken(token);
  if (!user) {
    res.status(403).json({
      data: {
        status: 403,
        message: "Invalid token",
      },
    });
    return;
  }

  req.user = user;

  next();
};

export { authenticateToken };
