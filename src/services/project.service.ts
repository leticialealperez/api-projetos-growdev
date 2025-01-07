import { Project } from "@prisma/client";
import {
  CreateProjectDto,
  DeleteProjectDto,
  GetProjectDto,
  ListProjectsDto,
  UpdateProjectDto,
} from "../dtos/project.dto";
import { repository } from "../database/prisma.connection";
import { HTTPError } from "../utils/http.error";

export class ProjectService {
  public async create(dto: CreateProjectDto): Promise<Project> {
    const newProject = await repository.project.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        tools: dto.tools,
        userId: dto.userId,
      },
    });

    return newProject;
  }

  public async update(dto: UpdateProjectDto): Promise<Project> {
    await this.getById(dto);

    const projectUpdated = await repository.project.update({
      where: { id: dto.projectId },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        tools: dto.tools,
      },
    });

    return projectUpdated;
  }

  public async delete(dto: DeleteProjectDto): Promise<Project> {
    await this.getById(dto);

    const projectDeleted = await repository.project.delete({
      where: { id: dto.projectId },
    });

    return projectDeleted;
  }

  public async getById(dto: GetProjectDto): Promise<Project> {
    const project = await repository.project.findUnique({
      where: { id: dto.projectId, userId: dto.userId },
    });

    if (!project) {
      throw new HTTPError(404, "Projeto não encontrado.");
    }

    return project;
  }

  public async list(dto: ListProjectsDto): Promise<Project[]> {
    const projects = await repository.project.findMany({
      where: {
        userId: dto.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return projects;
  }
}
