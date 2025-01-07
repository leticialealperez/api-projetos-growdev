import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";

export async function createUserValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { firstName, lastName, username, password } = req.body;

    if (!firstName) {
      throw new HTTPError(400, "Nome é obrigatório");
    }

    if (!lastName) {
      throw new HTTPError(400, "Sobrenome é obrigatório");
    }

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
