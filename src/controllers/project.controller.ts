import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import { ProjectService } from "../services/project.service";

export class ProjectController {
  public async index(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const service = new ProjectService();

      const projects = await service.list({ userId });

      return res.status(200).json({
        success: true,
        message: "Projetos listados com sucesso.",
        data: projects,
      });
    } catch (error) {
      return onError(error, res);
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const { title, description, tools, status, userId } = req.body;

      const service = new ProjectService();

      const project = await service.create({
        title,
        status,
        tools,
        userId,
        description,
      });

      return res.status(201).json({
        success: true,
        message: "Projeto cadastrado com sucesso.",
        data: project,
      });
    } catch (error) {
      return onError(error, res);
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const { userId } = req.body;

      const service = new ProjectService();

      const project = await service.getById({ userId, projectId });

      return res.status(200).json({
        success: true,
        message: "Projeto encontrado com sucesso.",
        data: project,
      });
    } catch (error) {
      return onError(error, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const { title, description, tools, status, userId } = req.body;

      const service = new ProjectService();

      const project = await service.update({
        title,
        status,
        tools,
        userId,
        description,
        projectId,
      });

      return res.status(200).json({
        success: true,
        message: "Projeto atualizado com sucesso.",
        data: project,
      });
    } catch (error) {
      return onError(error, res);
    }
  }

  public async destroy(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      const { userId } = req.body;

      const service = new ProjectService();

      const project = await service.delete({
        projectId,
        userId,
      });

      return res.status(200).json({
        success: true,
        message: "Projeto deletado com sucesso.",
        data: project,
      });
    } catch (error) {
      return onError(error, res);
    }
  }
}
