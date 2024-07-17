import {
  createStop,
  deleteStop,
  findStop,
  updateStop,
} from "../../controller/stopController.js";
import { Router } from "express";

const router = Router();

router.route("/stop").post(createStop);
router
  .route("/stop/:stopAddress")
  .get(findStop)
  .put(updateStop)
  .delete(deleteStop);

export { router };
