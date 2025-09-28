import { NextFunction, Request, Response } from "express";
import { ZodTypeAny, ZodError } from "zod";

export const validateRequest =
  (zodSchema: ZodTypeAny) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Handle multipart/form-data with "data" field
      if (req.body.data) {
        req.body = JSON.parse(req.body.data);
      }

      // Validate and parse
      req.body = await zodSchema.parseAsync(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
