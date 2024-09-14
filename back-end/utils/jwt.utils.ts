import jwt from "jsonwebtoken";

//TODO - add JWT_SECRET in .ENV!
const JWT_SECRET =
  process.env.JWT_SECRET || "d35428f7-986b-492c-a741-5b6c8321758f";

const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

const verifyToken = (token: string): { userId: number } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch (err) {
    return null;
  }
};

export { generateToken, verifyToken };
