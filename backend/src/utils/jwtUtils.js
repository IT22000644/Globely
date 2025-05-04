import jsonwebtoken from "jsonwebtoken";
import { JWT_EXPIRATION, JWT_SECRET } from "../config/index.js";

export const signToken = (userId, email) => {
  return jsonwebtoken.sign({ userId, email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const verifyToken = (token) => {
  return jsonwebtoken.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });
};
