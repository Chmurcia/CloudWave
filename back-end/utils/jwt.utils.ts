import jwt from "jsonwebtoken";

//TODO - add JWT_SECRET in .ENV!
const JWT_SECRET = process.env.JWT_SECRET || "36365649bf6e2790c65ff08498d0eb33";

const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "0de4ab2c664a5f3aecc5635e1a408b71";

const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (userId: number): string => {
  return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const verifyToken = (token: string): { userId: number } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch (err) {
    return null;
  }
};

const verifyRefreshToken = (token: string): { userId: number } | null => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: number };
  } catch (err) {
    return null;
  }
};

export { generateToken, verifyToken, generateRefreshToken, verifyRefreshToken };
