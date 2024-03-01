import { Student } from "../Models/StudentModels.js";
import { Stop } from "../Models/StopModel.js";
import { Tier } from "../Models/TierModel.js";
import { Request, Response } from "express";
import { Package } from "../Models/PackageModel.js";

//Create a tier with all associations
const createTier = async (req: Request, res: Response) => {
  const {
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
  } = req.body;
  try {
    const createdTier = await Tier.create({
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
  } catch (error) {
    console.error("Error occured while creating tier or route.", error);
    res.status(500).json({ message: "Server error. Try again!" });
  }
};

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

const findTierBySchoolOrRouteNumber = async (req: Request, res: Response) => {
  const { routeNumber, tierAnchor_school } = req.params;
  console.log("Route number is: ", routeNumber);
  try {
    const foundTierBySchoolOrRouteNumber = await Tier.findAndCountAll({
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
    if (
      !foundTierBySchoolOrRouteNumber ||
      foundTierBySchoolOrRouteNumber.rows.length === 0
    ) {
      return res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json([foundTierBySchoolOrRouteNumber]);
  } catch (error) {
    console.error(
      "Error coccured while finding route/tier by school or route number.",
      error
    );
    res.status(500).json({ message: "Server error." });
  }
};

const updateTier = async (req: Request, res: Response) => {
  const {
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
  } = req.body;
  try {
    // const {tierAnchor_school, routenumber} = req.params,
    const tierForupdate = await Tier.update(
      {
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
      },
      { where: { id: req.params.id } }
    );

    if (!tierForupdate) {
      return res
        .status(400)
        .json({ message: "Data not found to make an update!" });
    }

    res.status(200).json({ message: "Route/tier successfully updated." });
  } catch (error) {
    console.error("Error occured while updating route/tier.", error);
    res.status(500).json({ messge: "Server error." });
  }
};

const deleteRouteTier = async (req: Request, res: Response) => {
  try {
    const tierForDeletion = await Tier.destroy({
      where: { id: req.params.id },
      // include: [{model: Stop, include:[Student]}],
    });

    if (!tierForDeletion) {
      return res.status(400).json({ message: "Data not found!" });
    }

    res.status(200).json({ message: "Route/tier successfully deleted." });
  } catch (error) {
    console.error("Error occured while deleting route/tier.", error);
    res.status(500).json({ messge: "Server error." });
  }
};

export {
  createTier,
  findTierBySchoolOrRouteNumber,
  updateTier,
  deleteRouteTier,
};
