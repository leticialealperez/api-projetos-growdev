import express, { Application } from "express";
import { ProjectController } from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createProjectValidate } from "../middlewares/create-project.middleware";
import { projectIdValidate } from "../middlewares/project-uid.middleware";
import { updateProjectValidate } from "../middlewares/update-project.middleware";

export class ProjectRoutes {
  public static bind() {
    const router = express.Router();
    const controller = new ProjectController();

    router.get(
      "/projects",
      [authMiddleware as Application],
      controller.index as Application
    );
    router.get(
      "/projects/:projectId",
      [authMiddleware as Application, projectIdValidate as Application],
      controller.show as Application
    );
    router.post(
      "/projects",
      [authMiddleware as Application, createProjectValidate as Application],
      controller.store as Application
    );
    router.put(
      "/projects/:projectId",
      [
        authMiddleware as Application,
        projectIdValidate as Application,
        updateProjectValidate as Application,
      ],
      controller.update as Application
    );
    router.delete(
      "/projects/:projectId",
      [authMiddleware as Application, projectIdValidate as Application],
      controller.destroy as Application
    );

    return router;
  }
}
