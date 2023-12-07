var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Package } from "Models/PackageModel.js";
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
        if (!createdPackageInfo) {
            res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json({ message: "Package info is created." });
    }
    catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});
const findPackage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundPackage = yield Package.findAndCountAll({
            include: {
                all: true,
                nested: true,
            },
            where: {
                packageName: req.body.packageName,
            },
            offset: 8,
            limit: 2,
        });
        if (!foundPackage) {
            res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundPackage);
    }
    catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});
export { createPackageInfo, findPackage };
