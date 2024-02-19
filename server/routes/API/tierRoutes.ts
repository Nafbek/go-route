import {
  createTier,
  deleteRouteTier,
  findTierBySchoolOrRouteNumber,
  updateTier,
} from "../../controller/tierController.js";
import { Router } from "express";

const router = Router();

router.route("/tier").post(createTier);
router.route("/tier/:tierAnchor_school").get(findTierBySchoolOrRouteNumber);
router.route("/tier/:routeNumber").get(findTierBySchoolOrRouteNumber);
router.route("/tier/:id").put(updateTier).delete(deleteRouteTier);

export { router };
