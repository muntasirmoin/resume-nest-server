/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { TErrorSources } from "../interfaces/error.types";
import { handlerZodError } from "../helpers/handlerZodError";
import { handlerValidationError } from "../helpers/handlerValidationError";
import { handlerDuplicateError } from "../helpers/handleDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import AppError from "../helpers/AppError";
import { ZodError } from "zod";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  if (err.code === 11000) {
    const simplifiedError = handlerDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } // Prisma duplicate error (P2002)
  else if (err instanceof ZodError) {
    const formattedErrors = err.issues.map(
      (issue: (typeof err.issues)[number]) => ({
        path: issue.path.join("."),
        message: issue.message,
        code: issue.code,
      })
    );

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: formattedErrors,
    });
  } else if (err.code === "P2002") {
    statusCode = 400;
    message = `${err.meta?.target?.[0]} already exists!`;
    errorSources = [{ path: err.meta?.target?.[0] || "unknown", message }];
  } else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  } else if (err.name === "ZodError") {
    const simplifiedError = handlerZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources || [];
  } else if (err.name === "ValidationError") {
    const simplifiedError = handlerValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources || [];
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  // Send clean, standard response without raw err or stack
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
};
