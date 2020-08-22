import { Router } from "express";
import * as UsersController from "../../controllers/UsersController";

export const router = Router();

router.post("/", UsersController.create);
router.get("/", UsersController.getAll);
router.put("/:id", UsersController.update);
router.delete("/:id", UsersController.discard);

export default router;
