import { StatusProject } from "@prisma/client";

export interface CreateProjectDto {
  title: string;
  description?: string;
  tools: string[];
  status: StatusProject;
  userId: string;
}

export interface ListProjectsDto {
  userId: string;
}

export interface GetProjectDto extends ListProjectsDto {
  projectId: string;
}

export interface DeleteProjectDto extends GetProjectDto {}

export type UpdateProjectDto = Partial<CreateProjectDto> & GetProjectDto;
