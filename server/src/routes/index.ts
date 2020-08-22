import { Router } from "express";
import users from "./api/users";

const routes = Router();

routes.use("/api/users", users);

export default routes;
