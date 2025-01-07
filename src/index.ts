import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { UserRoutes } from "./routes/user.routes";
import { ProjectRoutes } from "./routes/project.routes";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use(UserRoutes.bind());
app.use(ProjectRoutes.bind());

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
