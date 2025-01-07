import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";

export async function loginUserValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;

    if (!username) {
      throw new HTTPError(400, "Nome de usuário é obrigatório");
    }

    if (!password) {
      throw new HTTPError(400, "Senha é obrigatório");
    }

    return next();
  } catch (error) {
    return onError(error, res);
  }
}
