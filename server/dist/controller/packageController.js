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
const createPackageInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { packageName, packageNumber, packageDescription } = req.body;
    try {
        const createdPackageInfo = yield Package.create({
            packageName,
            packageNumber,
            packageDescription,
            include: {
                all: true,
                nested: true,
            },
        });
        res.status(200).json(createdPackageInfo);
    }
    catch (error) {
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
    try {
        const foundPackage = yield Package.findOne({
            include: {
                all: true,
                nested: true,
            },
            where: {
                packageName: req.params.packageName,
            },
        });
        if (!foundPackage) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundPackage);
    }
    catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});
const updatePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverId, districtName, packageNumber, packageDescription } = req.body;
    try {
        const packageForUpdate = yield Package.findOne({
            where: { packageNumber },
        });
        if (!packageForUpdate) {
            return res.status(400).json({ message: "Data not found!" });
        }
        yield packageForUpdate.update({
            driverId,
            districtName,
            packageNumber,
            packageDescription,
        });
        res.status(200).json({ message: "Package successfully updated." });
    }
    catch (error) {
        console.error("Error occured while updating package.");
        res.status(500).json({ message: "Server error." });
    }
});
const deleteSinglePackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, packageName } = req.body;
    try {
        const packageForDeletion = yield Package.findOne({
            where: { id, packageName },
            include: [{ all: true, nested: true }],
        });
        if (!packageForDeletion) {
            return res.status(400).json({ message: "Data not found!" });
        }
        yield packageForDeletion.destroy();
        res.status(200).json({ message: "Package successfully deleted." });
    }
    catch (error) {
        console.error("Error occurd while deleting package", error);
        res.status(500).json({ message: "Server error." });
    }
});
export { createPackageInfo, findAllPackage, findSinglePackage, updatePackage, deleteSinglePackage, };
