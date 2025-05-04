import { config } from "dotenv";

config();

export const { JWT_SECRET, JWT_EXPIRATION, MONGO_URI, PORT } = process.env;
