import { Response } from "express";
import { HTTPError } from "./http.error";

export function onError(error: unknown, res: Response): Response {
  if (error instanceof HTTPError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    detail: (error as Error).toString(),
  });
}
