import { Router } from "express";
import { createMainDriver, findAllDrivers, 
// findOnlyAllDriversProfile,
findOnlySingleDriverProfile, findSingleMainDriver, findAllDriversBySchool, updateDriver, deleteSingleDriver, } from "../../controller/mainDriverController.js";
// Create a main driver and find all drivers
const router = Router();
router.route("/driver").post(createMainDriver).get(findAllDrivers);
// Find all drivers by school
router.route("/driver/:tierAnchor_school").get(findAllDriversBySchool);
// To find a single driver with basic information
router
    .route("/driver/profile/:driverFirstName")
    .get(findOnlySingleDriverProfile);
// To find a single driver with detailed information
router.route("/driver/details/:driverFirstName").get(findSingleMainDriver);
router.route("/driver/:id").delete(deleteSingleDriver).put(updateDriver);
export { router };
