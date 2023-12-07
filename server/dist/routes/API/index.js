import 'express';
import { Router } from "express";
import { router as MainDriverRoutes } from "./MainDriverRoutes.js";
const router = Router();
router.use("/api", MainDriverRoutes);
export { router };
