import {
  createStudent,
  deleteStudent,
  findSingleStudent,
  updateStudent,
} from "../../controller/studentControllers.js";
import { Router } from "express";
const router = Router();

router.route("/student").post(createStudent);
router
  .route("/student/:id")
  .get(findSingleStudent)
  .put(updateStudent)
  .delete(deleteStudent);

export { router };
