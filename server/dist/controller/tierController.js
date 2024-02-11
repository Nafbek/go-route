var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Tier } from "../Models/TierModel.js";
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
        if (!createdTier) {
            return res.status(400).json();
        }
        res.status(200).json({ message: "Tier successfully created." });
    }
    catch (error) {
        console.error("Error occured while creating tier or route.", error);
        res.status(500).json({ message: "Server error. Try again!" });
    }
});
const findTierByTime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundTierByTime = yield Tier.findAll({
            where: { timeStart: req.params.timeStart },
            include: {
                all: true,
                nested: true,
            },
        });
        if (!foundTierByTime) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundTierByTime);
    }
    catch (error) {
        console.error("Error occured while finding tier by time.");
        res.status(500).json({ message: "Server error" });
    }
});
const findTierBySchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundTierBySchool = yield Tier.findAll({
            where: { tierAnchor_school: req.params.tierAnchor_school },
            include: {
                all: true,
                nested: true,
            },
        });
        if (!foundTierBySchool) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundTierBySchool);
    }
    catch (error) {
        console.error("Error coccured while finding route/tier by school.");
        res.status(500).json({ message: "Server error." });
    }
});
const updateTier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tierAnchor_school, schoolContactNumber, package_id, routeNumber, shift, timeStart, timeEnd, totalRiders, runningDays, totalMiles, } = req.body;
    try {
        const tierForupdate = yield Tier.findOne({
            where: { tierAnchor_school, routeNumber },
            include: [{ all: true, nested: true }],
        });
        if (!tierForupdate) {
            return res.status(400).json({ message: "Data not found!" });
        }
        yield tierForupdate.update({
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
        });
        res.status(200).json({ message: "Route/tier successfully updated." });
    }
    catch (error) {
        console.error("Error occured while updating route/tier.");
        res.status(500).json({ messge: "Server error." });
    }
});
const deleteRouteTier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tierAnchor_school, routeNumber, } = req.body;
    try {
        const tierForupdate = yield Tier.findOne({
            where: { tierAnchor_school, routeNumber },
            include: [{ all: true, nested: true }],
        });
        if (!tierForupdate) {
            return res.status(400).json({ message: "Data not found!" });
        }
        yield tierForupdate.destroy();
        res.status(200).json({ message: "Route/tier successfully deleted." });
    }
    catch (error) {
        console.error("Error occured while deleting route/tier.");
        res.status(500).json({ messge: "Server error." });
    }
});
export { createTier, findTierBySchool, findTierByTime, updateTier, deleteRouteTier, };
