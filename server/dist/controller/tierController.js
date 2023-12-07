var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Tier } from "Models/TierModel.js";
//Create a tier with all associations
const createTier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tierAnchor_school, schoolContactNumber, package_id, routeNumber, shift, timeStart, timeEnd, totalRiders, runningDays, totalMiles, } = req.body;
    try {
        const createdTier = yield Tier.create({
            tierAnchor_school,
            schoolContactNumber,
            package_id,
            routeNumber,
            shift,
            timeStart,
            timeEnd,
            totalRiders,
            runningDays,
            totalMiles,
            include: {
                all: true,
                nested: true,
            },
        });
        res.status(200).json({ message: "Tier successfully created." });
    }
    catch (error) {
        res.status(500).json({ message: "Server error. Try again!" });
    }
});
const findTierByTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundTierByTime = yield Tier.findAll({
            where: { timeStart: req.body.timeStart },
            include: {
                all: true,
                nested: true,
            },
        });
        if (!foundTierByTime) {
            res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundTierByTime);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
const findTierBySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundTierBySchool = yield Tier.findAll({
            where: { tierAnchor_school: req.body.tierAnchor_school },
            include: {
                all: true,
                nested: true,
            },
        });
        if (!foundTierBySchool) {
            res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundTierBySchool);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
export { createTier, findTierBySchool, findTierByTime };
