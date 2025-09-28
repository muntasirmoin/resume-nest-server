import {
  TErrorSources,
  TGenericErrorResponse,
} from "../interfaces/error.types";

export const handlerZodError = (err: any): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = err.issues.map((issue: any) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));

  const combinedMessage = errorSources.map((e) => e.message).join(", ");

  return {
    statusCode: 400,
    message: combinedMessage || "Zod validation error",
    errorSources,
  };
};
