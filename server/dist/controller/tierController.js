var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Student } from "../Models/StudentModels.js";
import { Stop } from "../Models/StopModel.js";
import { Tier } from "../Models/TierModel.js";
import { Package } from "../Models/PackageModel.js";
//Create a tier with all associations
const createTier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tierAnchor_school, schoolContactNumber, packageId, routeNumber, shift, timeStart, timeEnd, totalRiders, runningDays, totalMiles, } = req.body;
    try {
        const createdTier = yield Tier.create({
            tierAnchor_school,
            schoolContactNumber,
            packageId,
            routeNumber,
            shift,
            timeStart,
            timeEnd,
            totalRiders,
            runningDays,
            totalMiles,
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
// const findTierByTime = async (req: Request, res: Response) => {
//   try {
//     const foundTierByTime = await Tier.findAndCountAll({
//       where: { timeStart: req.params.timeStart },
//       // include: [
//       //   { model: Package },
//       //   {
//       //     model: Stop,
//       //     as: "StopOnTier",
//       //     include: [{ model: Student, as: "StudentAtStop" }],
//       //   },
//       // ],
//     });
//     if (!foundTierByTime) {
//       return res.status(400).json({ message: "Data not found!" });
//     }
//     res.status(200).json(foundTierByTime);
//   } catch (error) {
//     console.error("Error occured while finding tier by time.");
//     res.status(500).json({ message: "Server error" });
//   }
// };
const findTierBySchoolOrRouteNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { routeNumber, tierAnchor_school } = req.params;
    console.log("Route number is: ", routeNumber);
    try {
        const foundTierBySchoolOrRouteNumber = yield Tier.findAndCountAll({
            where: { routeNumber, tierAnchor_school },
            include: [
                { model: Package },
                {
                    model: Stop,
                    as: "StopOnTier",
                    include: [{ model: Student, as: "StudentAtStop" }],
                },
            ],
            // offset: 10,
            // limit: 6,
        });
        if (!foundTierBySchoolOrRouteNumber ||
            foundTierBySchoolOrRouteNumber.rows.length === 0) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json([foundTierBySchoolOrRouteNumber]);
    }
    catch (error) {
        console.error("Error coccured while finding route/tier by school or route number.", error);
        res.status(500).json({ message: "Server error." });
    }
});
const updateTier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tierAnchor_school, schoolContactNumber, package_id, routeNumber, shift, timeStart, timeEnd, totalRiders, runningDays, totalMiles, } = req.body;
    try {
        // const {tierAnchor_school, routenumber} = req.params,
        const tierForupdate = yield Tier.update({
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
        }, { where: { id: req.params.id } });
        if (!tierForupdate) {
            return res
                .status(400)
                .json({ message: "Data not found to make an update!" });
        }
        res.status(200).json({ message: "Route/tier successfully updated." });
    }
    catch (error) {
        console.error("Error occured while updating route/tier.", error);
        res.status(500).json({ messge: "Server error." });
    }
});
const deleteRouteTier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tierForDeletion = yield Tier.destroy({
            where: { id: req.params.id },
            // include: [{model: Stop, include:[Student]}],
        });
        if (!tierForDeletion) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json({ message: "Route/tier successfully deleted." });
    }
    catch (error) {
        console.error("Error occured while deleting route/tier.", error);
        res.status(500).json({ messge: "Server error." });
    }
});
export { createTier, findTierBySchoolOrRouteNumber, updateTier, deleteRouteTier, };
