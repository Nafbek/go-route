import { Router } from "express";
import { createMainDriver, findAllDrivers, 
// findOnlyAllDriversProfile,
findOnlySingleDriverProfile, findSingleMainDriver, findAllDriversBySchool, updateDriver, deleteSingleDriver, } from "../../controller/mainDriverController.js";
const router = Router();
router.route("/driver").post(createMainDriver).get(findAllDrivers);
router.route("/driver/:tierAnchor_school").get(findAllDriversBySchool);
// router.route("/driver/profile").get(findOnlyAllDriversProfile);
router
    .route("/driver/profile/:driverFirstName")
    .get(findOnlySingleDriverProfile);
router.route("/driver/:driverFirstName").get(findSingleMainDriver);
router.route("/driver/:id").delete(deleteSingleDriver).put(updateDriver);
export { router };
