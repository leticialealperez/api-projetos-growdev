import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { validate } from "uuid";

export async function projectIdValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId } = req.params;

    if (!validate(projectId)) {
      throw new HTTPError(400, "Identificador de projeto inválido");
    }

    return next();
  } catch (error) {
    return onError(error, res);
  }
}
