import { Tier } from "../Models/TierModel.js";
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

    if (!createdTier) {
      return res.status(400).json();
    }
    res.status(200).json({ message: "Tier successfully created." });
  } catch (error) {
    console.error("Error occured while creating tier or route.", error);
    res.status(500).json({ message: "Server error. Try again!" });
  }
};

const findTierByTime = async (req: Request, res: Response) => {
  try {
    const foundTierByTime = await Tier.findAll({
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
  } catch (error) {
    console.error("Error occured while finding tier by time.");
    res.status(500).json({ message: "Server error" });
  }
};

const findTierBySchool = async (req: Request, res: Response) => {
  try {
    const foundTierBySchool = await Tier.findAll({
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
  } catch (error) {
    console.error("Error coccured while finding route/tier by school.");
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
    const tierForupdate = await Tier.findOne({
      where: { tierAnchor_school, routeNumber },
      include: [{ all: true, nested: true }],
    });

    if (!tierForupdate) {
      return res.status(400).json({ message: "Data not found!" });
    }

    await tierForupdate.update({
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
  } catch (error) {
    console.error("Error occured while updating route/tier.");
    res.status(500).json({ messge: "Server error." });
  }
};

const deleteRouteTier = async (req: Request, res: Response) => {
  const {
    tierAnchor_school,

    routeNumber,
  } = req.body;
  try {
    const tierForupdate = await Tier.findOne({
      where: { tierAnchor_school, routeNumber },
      include: [{ all: true, nested: true }],
    });

    if (!tierForupdate) {
      return res.status(400).json({ message: "Data not found!" });
    }

    await tierForupdate.destroy();
    res.status(200).json({ message: "Route/tier successfully deleted." });
  } catch (error) {
    console.error("Error occured while deleting route/tier.");
    res.status(500).json({ messge: "Server error." });
  }
};

export {
  createTier,
  findTierBySchool,
  findTierByTime,
  updateTier,
  deleteRouteTier,
};
