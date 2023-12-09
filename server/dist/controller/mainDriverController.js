var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MainDriver } from "../Models/MainDriverModel.js";
//Create driver with complete package
const createMainDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { driverFirstName, driverLastName, driverContactNumber, driverSecondContactNumber, } = req.body;
        const newDriver = yield MainDriver.create({
            driverFirstName,
            driverLastName,
            driverContactNumber,
            driverSecondContactNumber,
        }, {
            include: [
                {
                    all: true,
                    nested: true,
                },
            ],
        });
        res.status(200).json(newDriver);
    }
    catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});
//find all drivers with complete package
const findAllDrivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundAllDrivers = yield MainDriver.findAll({
            include: { all: true, nested: true },
            logging: console.log,
        });
        console.log("Drivers found: ", foundAllDrivers);
        if (!foundAllDrivers) {
            res.status(400).json({ message: "Data not found!" });
            return;
        }
        res.status(200).json(foundAllDrivers);
    }
    catch (error) {
        console.error("Error in finding all drivers", error);
        res.status(500).json({ message: "Server error." });
    }
});
//Find a single driver by name with complete package
const findSingleMainDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundSingleMainDriver = yield MainDriver.findOne({
            include: [
                {
                    all: true,
                    nested: true,
                    // where: { id: req.params.driver_id },
                    where: { driverFirstName: req.params.driverFirstName },
                },
            ],
        });
        if (!foundSingleMainDriver) {
            res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundSingleMainDriver);
    }
    catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});
//Find all drivers by school/anchor
const findAllDriversBySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundAllDriversBySchool = yield MainDriver.findAndCountAll({
            include: [
                {
                    all: true,
                    nested: true,
                    where: { tierAnchor_school: req.body.tierAnchor_school },
                },
            ],
        });
        if (!foundAllDriversBySchool) {
            res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundAllDriversBySchool);
    }
    catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});
//Find only list of all drivers with basic personal information
const findOnlyAllDriversProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundOnlyAllDriversProfile = yield MainDriver.findAll();
        if (!foundOnlyAllDriversProfile) {
            res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundOnlyAllDriversProfile);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
const findOnlySingleDriverProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundOnlySingleDriverProfile = yield MainDriver.findOne({
            where: { driverFirstName: req.body.driverFirstName },
        });
        if (!foundOnlySingleDriverProfile) {
            res.status(400).json({ message: "Data not found!" });
        }
        res.status(500).json(foundOnlySingleDriverProfile);
    }
    catch (error) {
        res.status(500).json({ message: "Server error." });
    }
});
const updateDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverFirstName, driverLastName, driverContactNumber, driverSecondContactNumber, } = req.body;
    try {
        const driverForUpdate = yield MainDriver.findOne({
            where: { driverFirstName, driverLastName },
            include: [{ all: true, nested: true }],
        });
        if (!driverForUpdate) {
            return res.status(400).json({ message: "Data not found!" });
        }
        yield (driverForUpdate === null || driverForUpdate === void 0 ? void 0 : driverForUpdate.update({
            driverFirstName,
            driverLastName,
            driverContactNumber,
            driverSecondContactNumber,
        }));
        res.status(200).json({ message: "Driver successfully updated." });
    }
    catch (error) {
        console.error("Error occured while updating driver", error);
        res.status(500).json({ message: "Server error." });
    }
});
const deleteSingleDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, driverFirstName } = req.body;
    try {
        const driverForDeletion = yield MainDriver.findOne({
            where: { id, driverFirstName },
            include: [{ all: true, nested: true }],
        });
        if (!driverForDeletion) {
            return res.status(400).json({ message: "Data not found!" });
        }
        yield driverForDeletion.destroy();
        res.status(200).json({ message: "Driver successfully removed." });
    }
    catch (error) {
        console.error("Error occured while deleting driver", error);
        res.status(500).json({ message: "Server error." });
    }
});
export { createMainDriver, findAllDrivers, findAllDriversBySchool, findSingleMainDriver, findOnlyAllDriversProfile, findOnlySingleDriverProfile, updateDriver, deleteSingleDriver, };
