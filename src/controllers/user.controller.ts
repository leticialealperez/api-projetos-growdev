import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HTTPError } from "../utils/http.error";
import { onError } from "../utils/on-error";

export class UserController {
  public async store(req: Request, res: Response) {
    try {
      const { firstName, lastName, username, password } = req.body;

      const service = new UserService();

      await service.create({ firstName, lastName, password, username });

      return res.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso.",
      });
    } catch (error) {
      return onError(error, res);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const service = new UserService();

      const user = await service.signIn({ password, username });

      return res.status(200).json({
        success: true,
        message: "Usuário autenticado com sucesso",
        data: user,
      });
    } catch (error) {
      return onError(error, res);
    }
  }
}
