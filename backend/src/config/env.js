import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 4013,
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ranhill_saj",
  jwtSecret: process.env.JWT_SECRET || "dev-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};
