import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { UserService } from "../services/user.service";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;

    if (!token)
      throw new HTTPError(401, "Token de autenticação não informado.");

    const service = new UserService();

    const userFound = await service.getByToken(token);

    if (!userFound) throw new HTTPError(401, "Token de autenticação inválido.");

    req.body.userId = userFound.id;

    return next();
  } catch (error) {
    return onError(error, res);
  }
}
