import { verifyToken } from "../utils/jwtUtils.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default authMiddleware;
