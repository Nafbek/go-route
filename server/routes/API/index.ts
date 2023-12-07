import "express";
import { Router } from "express";
import { router as mainDriverRoutes } from "./MainDriverRoutes.js";

const router = Router();

router.use("/api", mainDriverRoutes);

export { router };
