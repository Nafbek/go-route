import { Tier } from "Models/TierModel.js";
import { Request, Response } from "express";

//Create a tier with all associations
const createTier = async (req: Request, res: Response) => {
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
    const createdTier = await Tier.create({
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
  } catch (error) {
    res.status(500).json({ message: "Server error. Try again!" });
  }
};

const findTierByTime = async (req: Request, res: Response) => {
  try {
    const foundTierByTime = await Tier.findAll({
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
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const findTierBySchool = async (req: Request, res: Response) => {
  try {
    const foundTierBySchool = await Tier.findAll({
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
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { createTier, findTierBySchool, findTierByTime };
