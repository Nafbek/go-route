import { Router } from "express";

import {
  createMainDriver,
  findAllDrivers,
  findOnlyAllDriversProfile,
  findOnlySingleDriverProfile,
  findSingleMainDriver,
  findAllDriversBySchool,
  updateDriver,
  deleteSingleDriver,
} from "../../controller/mainDriverController.js";

const router = Router();
router.route("/driver").post(createMainDriver).get(findAllDrivers);

router.route("/driver/:tierAnchor_school").get(findAllDriversBySchool);
router.route("/driver/profile").get(findOnlyAllDriversProfile);
router
  .route("/driver/profile/:driverFirstName")
  .get(findOnlySingleDriverProfile);

router
  .route("/driver/:driverFirstName")
  .get(findSingleMainDriver)
  .delete(deleteSingleDriver)
  .put(updateDriver);
router.route("/driver/:driverFirstName");

export { router };
