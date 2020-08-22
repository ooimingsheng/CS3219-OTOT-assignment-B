import { Router } from "express";
import users from "./api/users";

const routes = Router();

routes.use("/users", users);

export default routes;
