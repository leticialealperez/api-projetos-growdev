import express, { Application } from "express";
import { UserController } from "../controllers/user.controller";
import { createUserValidate } from "../middlewares/create-user.middleware";
import { loginUserValidate } from "../middlewares/login-user.middleware";

export class UserRoutes {
  public static bind() {
    const router = express.Router();
    const controller = new UserController();

    router.post(
      "/signup",
      [createUserValidate as Application],
      controller.store as Application
    );
    router.post(
      "/signin",
      [loginUserValidate as Application],
      controller.login as Application
    );

    return router;
  }
}
