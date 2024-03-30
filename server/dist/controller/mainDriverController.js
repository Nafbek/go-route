var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { MainDriver } from "../Models/MainDriverModel.js";
// import { Package } from "../Models/PackageModel.js";
// import { Tier } from "../Models/TierModel.js";
// import { Stop } from "../Models/StopModel.js";
// import { Student } from "../Models/StudentModels.js";
import { MainDriver, Package, Tier, Stop, Student } from "../Models/index.js";
//Create a driver
const createMainDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Create Driver: ", req.body);
        const { driverFirstName, driverLastName, driverContactNumber, driverSecondContactNumber, } = req.body;
        const newDriver = yield MainDriver.create({
            driverFirstName,
            driverLastName,
            driverContactNumber,
            driverSecondContactNumber,
        });
        const passcode = newDriver.passcode;
        res.status(200).json({
            driver: newDriver,
            passcode: passcode,
            message: "Driver created successfully",
        });
    }
    catch (error) {
        console.error("Error occured while creating driver data.", error);
        res.status(500).json({ message: "Server error." });
    }
});
//find all drivers with basic personal information
const findAllDrivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundAllDrivers = yield MainDriver.findAll();
        console.log("Drivers found: ", foundAllDrivers);
        if (!foundAllDrivers || foundAllDrivers.length === 0) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundAllDrivers);
    }
    catch (error) {
        console.error("Error in finding all drivers", error);
        res.status(500).json({ message: "Server error." });
    }
});
// Find a single driver with basic personal information
const findOnlySingleDriverProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverFirstName } = req.params;
    try {
        const foundOnlySingleDriverProfile = yield MainDriver.findOne({
            where: { driverFirstName: driverFirstName },
        });
        if (!foundOnlySingleDriverProfile) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundOnlySingleDriverProfile);
    }
    catch (error) {
        console.error("Error occured while fetching a driver profile.", error);
        res.status(500).json({ message: "Server error." });
    }
});
//Find a single driver by name with complete package
const findSingleMainDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverFirstName } = req.params;
    try {
        const foundSingleMainDriver = yield MainDriver.findOne({
            where: { driverFirstName: driverFirstName },
            include: [
                {
                    model: Package,
                    include: [
                        {
                            model: Tier,
                            include: [
                                {
                                    model: Stop,
                                    as: "stops",
                                    include: [{ model: Student, as: "students" }],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        if (!foundSingleMainDriver) {
            res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundSingleMainDriver);
    }
    catch (error) {
        console.error("Error occured while fetching a single driver data.", error);
        res.status(500).json({ message: "Server error." });
    }
});
//Find all drivers by school/anchor
const findAllDriversBySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tierAnchor_school } = req.params;
    try {
        const foundAllDriversBySchool = yield MainDriver.findAndCountAll({
            include: [
                {
                    model: Package,
                    include: [
                        {
                            model: Tier,
                            include: [
                                {
                                    model: Stop,
                                    as: "stops",
                                    include: [{ model: Student, as: "students" }],
                                },
                            ],
                            where: { tierAnchor_school: tierAnchor_school },
                        },
                    ],
                },
            ],
            // offset: 10,
            // limit:6
        });
        if (!foundAllDriversBySchool) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundAllDriversBySchool);
    }
    catch (error) {
        console.error("Error occured while fetching driver by school they go to.");
        res.status(500).json({ message: "Server error." });
    }
});
const updateDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { driverFirstName, driverLastName, driverContactNumber, driverSecondContactNumber, } = req.body;
    try {
        const driverForUpdate = yield MainDriver.update({
            driverFirstName,
            driverLastName,
            driverContactNumber,
            driverSecondContactNumber,
        }, {
            where: {
                id: req.params.id,
            },
        });
        console.log("This is driver's data for update: ", driverForUpdate);
        if (!driverForUpdate) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json({ message: "Driver successfully updated." });
    }
    catch (error) {
        console.error("Error occured while updating driver", error);
        res.status(500).json({ message: "Server error." });
    }
});
const deleteSingleDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverForDeletion = yield MainDriver.destroy({
            where: { id: req.params.id },
        });
        console.log("This is driver's data for deletion", driverForDeletion);
        if (!driverForDeletion) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json({ message: "Driver successfully removed." });
    }
    catch (error) {
        console.error("Error occured while deleting driver", error);
        res.status(500).json({ message: "Server error." });
    }
});
export { createMainDriver, findAllDrivers, findOnlySingleDriverProfile, findSingleMainDriver, findAllDriversBySchool, updateDriver, deleteSingleDriver, };
