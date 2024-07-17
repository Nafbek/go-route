// import { Student } from "../Models/StudentModels.js";
// import { MainDriver } from "../Models/MainDriverModel.js";
// import { Package } from "../Models/PackageModel.js";
// import { Stop } from "../Models/StopModel.js";
// import { Tier } from "../Models/TierModel.js";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Tier, Stop, Student, Package, MainDriver } from "../Models/index.js";
// Create a stop/adress
const createStop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tierId, stopName, stopAddress, destinationAddress, pickupTime_home, dropoffTime_home, pickupTime_school, dropoffTime_school, } = req.body;
    try {
        const createdStop = yield Stop.create({
            tierId,
            stopName,
            stopAddress,
            destinationAddress,
            pickupTime_home,
            dropoffTime_home,
            pickupTime_school,
            dropoffTime_school,
        });
        res
            .status(200)
            .json({ message: "New stop successfully created.", createdStop });
    }
    catch (error) {
        console.error("Error occured while creating stop.", error);
        res.status(500).json({ message: "Server error." });
    }
});
// Find a single stop
const findStop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stopAddress = decodeURIComponent(req.params.stopAddress);
        console.log("this is stopaddress", stopAddress);
        const foundStop = yield Stop.findOne({
            where: { stopAddress: stopAddress },
            include: [
                {
                    model: Tier,
                    include: [
                        {
                            model: Package,
                            include: [{ model: MainDriver }],
                        },
                    ],
                },
                { model: Student, as: "students" },
            ],
        });
        if (!foundStop) {
            return res.status(400).json({ message: "Address not not found!" });
        }
        res.status(200).json(foundStop);
    }
    catch (error) {
        console.error("Error occcured while finding stop.", error);
        res.status(500).json({ message: "Server error." });
    }
});
// Update a single stop
const updateStop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stopName, stopAddress, destinationAddress, pickupTime_home, dropoffTime_home, pickupTime_school, dropoffTime_school, } = req.body;
    const { id } = req.params;
    try {
        const stopForUpdate = yield Stop.update({
            stopName,
            stopAddress,
            destinationAddress,
            pickupTime_home,
            dropoffTime_home,
            pickupTime_school,
            dropoffTime_school,
        }, { where: { id: id } });
        if (!stopForUpdate) {
            return res.status(400).json({ message: "Unable to update the stop!" });
        }
        res.status(200).json({ messge: "Stop successfully updated." });
    }
    catch (error) {
        console.error("Error occured while updating a stop.", error);
        res.status(500).json({ message: "Server error." });
    }
});
// Delete a single stop
const deleteStop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const stopFordeletion = yield Stop.destroy({
            where: { id: id },
        });
        if (!stopFordeletion) {
            return res.status(400).json({ message: "Unable to remove the stop!" });
        }
        res.status(200).json({ messge: "Stop successfully removed." });
    }
    catch (error) {
        console.error("Error occured while deleting a stop.", error);
        res.status(500).json({ message: "Server error." });
    }
});
export { createStop, findStop, updateStop, deleteStop };
