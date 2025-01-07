import { NextFunction, Request, Response } from "express";
import { onError } from "../utils/on-error";
import { HTTPError } from "../utils/http.error";
import { StatusProject } from "@prisma/client";

export async function createProjectValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { title, tools, status, userId } = req.body;

    if (!title) {
      throw new HTTPError(400, "Título é obrigatório");
    }

    if (!tools) {
      tools = [];
    }

    if (!status) {
      throw new HTTPError(400, "Status do projeto é obrigatório");
    }

    if (!userId) {
      throw new HTTPError(400, "Identificador do usuário é obrigatório");
    }

    if (
      !Array.isArray(tools) ||
      !tools.every((tool) => typeof tool === "string")
    ) {
      throw new HTTPError(400, "Ferramentas deve ser uma lista de strings");
    }

    if (![StatusProject.InProgress, StatusProject.Done].includes(status)) {
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
