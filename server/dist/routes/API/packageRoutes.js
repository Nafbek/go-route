import { createPackageInfo, deleteSinglePackage, findAllPackage, findSinglePackage, updatePackage, } from "../../controller/packageController.js";
import { Router } from "express";
const router = Router();
router.route("/package").post(createPackageInfo).get(findAllPackage);
router
    .route("/package/:packageNumber")
    .get(findSinglePackage)
    .put(updatePackage)
    .delete(deleteSinglePackage);
export { router };
