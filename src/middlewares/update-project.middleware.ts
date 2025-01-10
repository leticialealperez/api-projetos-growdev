import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { StatusProject } from "@prisma/client";

export async function updateProjectValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { tools, status, userId } = req.body;

    if (!userId) {
      throw new HTTPError(400, "Identificador do usuário é obrigatório");
    }

    if (
      tools &&
      (!Array.isArray(tools) ||
        !tools.every((tool) => typeof tool === "string"))
    ) {
      throw new HTTPError(400, "Ferramentas deve ser uma lista de strings");
    }

    if (
      status &&
      ![StatusProject.InProgress, StatusProject.Done].includes(status)
    ) {
      throw new HTTPError(
        400,
        "Status inválido. Informe um dos seguintes valores: ".concat(
          StatusProject.InProgress,
          ", ",
          StatusProject.Done
        )
      );
    }

    return next();
  } catch (error) {
    return onError(error, res);
  }
}
