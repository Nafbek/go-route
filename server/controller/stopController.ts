import { MainDriver } from "../Models/MainDriverModel.js";
import { Package } from "../Models/PackageModel.js";
import { Stop } from "../Models/StopModel.js";
import { Tier } from "../Models/TierModel.js";
import { Request, Response } from "express";

const createStop = async (req: Request, res: Response) => {
  const {
    tier_id,
    stopName,
    stopAddress,
    destinationAddress,
    pickDropTime_home,
    pickDropTime_school,
  } = req.body;

  try {
    const createdStop = await Stop.create({
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
  } catch (error) {
    console.error("Error occured while creating stop.", error);
    res.status(500).json({ message: "Server error." });
  }
};

const findStop = async (req: Request, res: Response) => {
  try {
    const foundStop = await Stop.findAll({
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
  } catch (error) {
    console.error("Error occcured while finding stop.", error);
    res.status(500).json({ message: "Server error." });
  }
};

const updateStop = async (req: Request, res: Response) => {
  const { stopName, stopAddress, pickDropTime_home, pickDropTime_school } =
    req.body;
  try {
    const stopForUpdate = await Stop.findOne({
      where: { id: req.params.id },
      include: [Package, Tier, MainDriver],
    });
    if (!stopForUpdate) {
      return res.status(400).json({ message: "Data not found!" });
    }
    await stopForUpdate.update({
      stopName,
      stopAddress,
      pickDropTime_home,
      pickDropTime_school,
    });
    res.status(200).json({ messge: "Stop successfully updated." });
  } catch (error) {
    console.error("Error occured while updating a stop.", error);
    res.status(500).json({ message: "Server error." });
  }
};

const deleteStop = async (req: Request, res: Response) => {
  try {
    const stopFordeletion = await Stop.findOne({
      where: { id: req.params.id },
    });
    if (!stopFordeletion) {
      return res.status(400).json({ message: "Data not found!" });
    }
    await stopFordeletion.destroy();
    res.status(200).json({ messge: "Stop successfully removed." });
  } catch (error) {
    console.error("Error occured while deleting a stop.", error);
    res.status(500).json({ message: "Server error." });
  }
};

export { createStop, findStop, updateStop, deleteStop };
