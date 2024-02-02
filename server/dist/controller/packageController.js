var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Package } from "../Models/PackageModel.js";
// Create package with
const createPackageInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { packageName, packageNumber, districtName, packageDescription } = req.body;
    try {
        const createdPackageInfo = yield Package.create({
            packageName,
            packageNumber,
            districtName,
            packageDescription,
            include: {
                all: true,
                nested: true,
            },
        });
        res.status(200).json(createdPackageInfo);
    }
    catch (error) {
        console.error("Error occured while creating package.");
        res.status(500).json({ message: "Server error." });
    }
});
const findAllPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundAllPackage = yield Package.findAll();
        if (!foundAllPackage) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundAllPackage);
    }
    catch (error) {
        console.error("Error in finding all drivers", error);
        res.status(500).json({ message: "Server error" });
    }
});
const findSinglePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { packageNumber } = req.params;
    try {
        const foundPackage = yield Package.findOne({
            include: {
                all: true,
                nested: true,
            },
            where: {
                packageNumber: packageNumber,
            },
        });
        if (!foundPackage) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.setHeader("Cache-Control", "no-store");
        res.status(200).json(foundPackage);
    }
    catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});
const updatePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverId, districtName, packageNumber, packageDescription } = req.body;
    try {
        const [affectedRow, packageForUpdate] = yield Package.update({ driverId, districtName, packageNumber, packageDescription }, {
            where: { packageNumber },
            returning: true,
            logging: console.log,
        });
        if (affectedRow === 0 ||
            !packageForUpdate ||
            packageForUpdate.length === 0) {
            return res
                .status(400)
                .json({ message: "Data not found for the update!" });
        }
        const updatedPackage = packageForUpdate[0];
        res
            .status(200)
            .json({ message: "Package successfully updated.", updatedPackage });
    }
    catch (error) {
        console.error("Error occured while updating package.", error);
        res.status(500).json({ message: "Server error." });
    }
});
const deleteSinglePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, packageNumber } = req.body;
    try {
        const packageForDeletion = yield Package.destroy({
            where: { id, packageNumber },
            // include: [{ all: true, nested: true }],
        });
        if (!packageForDeletion) {
            return res.status(400).json({ message: "Data not found!" });
        }
        // await packageForDeletion.destroy();
        res.status(200).json({ message: "Package successfully deleted." });
    }
    catch (error) {
        console.error("Error occurd while deleting package", error);
        res.status(500).json({ message: "Server error." });
    }
});
export { createPackageInfo, findAllPackage, findSinglePackage, updatePackage, deleteSinglePackage, };
