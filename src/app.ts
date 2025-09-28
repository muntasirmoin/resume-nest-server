import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

import cors from "cors";
import { router } from "./app/routes";

import { envVars } from "./app/config/env";
import notFound from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app = express();

app.use(cookieParser());
app.use(express.json());

// app.use(cors());
app.use(
  cors({
    // origin: true,
    origin: envVars.FRONTEND_URL,
    credentials: true,
  })
);

// routes -> index.ts
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message:
      "resume-nest is running successfully. Welcome to the resume-nest portfolio Website!",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
