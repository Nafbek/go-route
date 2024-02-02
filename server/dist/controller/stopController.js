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
import { Package } from "../Models/PackageModel.js";
import { Stop } from "../Models/StopModel.js";
import { Tier } from "../Models/TierModel.js";
const createStop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tier_id, stopName, stopAddress, destinationAddress, pickDropTime_home, pickDropTime_school, } = req.body;
    try {
        const createdStop = yield Stop.create({
            tier_id,
            stopName,
            stopAddress,
            destinationAddress,
            pickDropTime_home,
            pickDropTime_school,
            include: {
                model: [Tier],
            },
        });
        res.status(200).json(createdStop);
    }
    catch (error) {
        console.error("Error occured while creating stop.", error);
        res.status(500).json({ message: "Server error." });
    }
});
const findStop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundStop = yield Stop.findAll({
            include: [
                Tier,
                {
                    model: MainDriver,
                },
                Package,
            ],
        });
        if (!foundStop) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundStop);
    }
    catch (error) {
        console.error("Error occcured while finding stop.", error);
        res.status(500).json({ message: "Server error." });
    }
});
const updateStop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stopName, stopAddress, pickDropTime_home, pickDropTime_school } = req.body;
    try {
        const stopForUpdate = yield Stop.findOne({
            where: { id: req.params.id },
            include: [Package, Tier, MainDriver],
        });
        if (!stopForUpdate) {
            return res.status(400).json({ message: "Data not found!" });
        }
        yield stopForUpdate.update({
            stopName,
            stopAddress,
            pickDropTime_home,
            pickDropTime_school,
        });
        res.status(200).json({ messge: "Stop successfully updated." });
    }
    catch (error) {
        console.error("Error occured while updating a stop.", error);
        res.status(500).json({ message: "Server error." });
    }
});
const deleteStop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stopFordeletion = yield Stop.findOne({
            where: { id: req.params.id },
        });
        if (!stopFordeletion) {
            return res.status(400).json({ message: "Data not found!" });
        }
        yield stopFordeletion.destroy();
        res.status(200).json({ messge: "Stop successfully removed." });
    }
    catch (error) {
        console.error("Error occured while deleting a stop.", error);
        res.status(500).json({ message: "Server error." });
    }
});
export { createStop, findStop, updateStop, deleteStop };
