import "express";
import { Router } from "express";
import { router as mainDriverRoutes } from "./MainDriverRoutes.js";
import { router as packageRoutes } from "./packageRoutes.js";
import { router as tierRoutes } from "./tierRoutes.js";
import { router as stopRoutes } from "./stopRoutes.js";
import { router as studentRoutes } from "./studentRoutes.js";
const router = Router();
router.use("/api", mainDriverRoutes);
router.use("/api", packageRoutes);
router.use("/api", tierRoutes);
router.use("/api", stopRoutes);
router.use("/api", studentRoutes);
export { router };
