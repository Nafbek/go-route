import { Router } from "express";

import {
  createMainDriver,
  findAllDrivers,
  findOnlyAllDriversProfile,
  findOnlySingleDriverProfile,
  findSingleMainDriver,
  findAllDriversBySchool,
} from "../../controller/mainDriverController.js";

const router = Router();
router.route("/driver").post(createMainDriver).get(findAllDrivers);
router.route("/driver/profile").get(findOnlyAllDriversProfile);
router.route("/driver/profile/:id").get(findOnlySingleDriverProfile);
router.route("/driver/:id").get(findSingleMainDriver);
router.route("/driver/:school").get(findAllDriversBySchool);

export { router };
