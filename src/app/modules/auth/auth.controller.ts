import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import passport from "passport";

import AppError from "../../helpers/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { setAuthCookie } from "../../utils/setCookie";

import { envVars } from "../../config/env";
import { createUserTokens } from "../../utils/userToken";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (err: any, user: any, info: any) => {
      console.log("user:", user);
      if (err) {
        return next(new AppError(401, err));
      }

      if (!user) {
        return next(new AppError(401, info.message));
      }

      const userTokens = await createUserTokens(user);

      // Remove password directly for Prisma user
      const { password, ...rest } = user; // <-- Prisma returns plain object

      setAuthCookie(res, userTokens);

      const timestamp = new Date().toLocaleString();
      console.log(
        `[Notification] Account Logged In Successfully at ${timestamp}.`
      );

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Account Logged In Successfully",
        data: {
          accessToken: userTokens.accessToken,
          refreshToken: userTokens.refreshToken,
          user: rest,
        },
      });
    })(req, res, next);
  }
);

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    // secure: false,
    // sameSite: "lax",
    secure: envVars.NODE_ENV === "production",
    sameSite: "none",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    // secure: false,
    // sameSite: "lax",
    secure: envVars.NODE_ENV === "production",
    sameSite: "none",
  });

  const timestamp = new Date().toLocaleString();
  console.log(`[Notification] User logged out at ${timestamp}!`);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Logged Out Successfully",
    data: null,
  });
});

export const AuthControllers = {
  credentialsLogin,
  logout,
};
