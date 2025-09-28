import { JwtPayload } from "jsonwebtoken";
import { StatusCodes as httpStatus } from "http-status-codes";
import { generateToken, verifyToken } from "./jwt";
import { envVars } from "../config/env";
import AppError from "../helpers/AppError";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserTokens = (user: User) => {
  const jwtPayload = {
    userId: user.id, // Prisma uses `id` instead of `_id`
    email: user.email, // or phone if you want
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createNewAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;

  // Fetch user by email or phone from the verified token
  const isUserExist = await prisma.user.findUnique({
    where: { email: verifiedRefreshToken.email as string },
  });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Account does not exist");
  }

  const jwtPayload = {
    userId: isUserExist.id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  return accessToken;
};
