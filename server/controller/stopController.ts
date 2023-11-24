import { MainDriver } from "Models/MainDriverModel.js";
import { Package } from "Models/PackageModel.js";
import { Stop } from "Models/StopModel.js";
import { Tier } from "Models/TierModel.js";
import { Request, Response } from "express";

const createStop = async (req: Request, res: Response) => {
  const {
    tier_id,
    stopName,
    stopAddress,
    pickDropTime_home,
    pickDropTime_school,
  } = req.body;

  try {
    const createdStop = await Stop.create({
      tier_id,
      stopName,
      stopAddress,
      pickDropTime_home,
      pickDropTime_school,
      include: {
        model: [Tier],
      },
    });
    res.status(200).json({ message: "Stops successfully created." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const findStop = async (req: Request, res: Response) => {
  try {
    const foundStop = await Stop.findAll({
      where: { stopAddress: req.body.stopAddress },
      include: [
        Tier,
        {
          model: MainDriver,
        },
        Package,
      ],
    });

    if (!foundStop) {
      res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundStop);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

export { createStop, findStop };
