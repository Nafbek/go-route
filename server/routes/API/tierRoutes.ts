import {
  createTier,
  deleteRouteTier,
  findTierBySchool,
  updateTier,
} from "controller/tierController.js";
import { Router } from "express";

const router = Router();

router.route("/tier").post(createTier);
router.route("/tier/:school").get(findTierBySchool);
router.route("/tier/:routenumber").put(updateTier).delete(deleteRouteTier);
