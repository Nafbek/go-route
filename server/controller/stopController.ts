// import { Student } from "../Models/StudentModels.js";
// import { MainDriver } from "../Models/MainDriverModel.js";
// import { Package } from "../Models/PackageModel.js";
// import { Stop } from "../Models/StopModel.js";
// import { Tier } from "../Models/TierModel.js";

import { Tier, Stop, Student, Package, MainDriver } from "../Models/index.js";
import { Request, Response } from "express";

// Create a stop/adress
const createStop = async (req: Request, res: Response) => {
  const {
    tierId,
    stopName,
    stopAddress,
    destinationAddress,
    pickupTime_home,
    dropoffTime_home,
    pickupTime_school,
    dropoffTime_school,
  } = req.body;

  try {
    const createdStop = await Stop.create({
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
  } catch (error) {
    console.error("Error occured while creating stop.", error);
    res.status(500).json({ message: "Server error." });
  }
};
// Find a single stop
const findStop = async (req: Request, res: Response) => {
  try {
    const foundStop = await Stop.findOne({
      where: { id: req.params.id },
      include: [
        // {
        //   model: Tier,
        //   include: [
        //     {
        //       model: Package,
        //       include: [{ model: MainDriver }],
        //     },
        //   ],
        // },
        { model: Student, as: "students" },
      ],
    });

    if (!foundStop) {
      return res.status(400).json({ message: "Address not not found!" });
    }
    res.status(200).json(foundStop);
  } catch (error) {
    console.error("Error occcured while finding stop.", error);
    res.status(500).json({ message: "Server error." });
  }
};
// Update a single stop
const updateStop = async (req: Request, res: Response) => {
  const {
    stopName,
    stopAddress,
    destinationAddress,
    pickupTime_home,
    dropoffTime_home,
    pickupTime_school,
    dropoffTime_school,
  } = req.body;

  const { tierId, id } = req.params;
  try {
    const stopForUpdate = await Stop.update(
      {
        stopName,
        stopAddress,
        destinationAddress,
        pickupTime_home,
        dropoffTime_home,
        pickupTime_school,
        dropoffTime_school,
      },
      { where: { id: id, tierId: tierId } }
    );
    if (!stopForUpdate) {
      return res.status(400).json({ message: "Unable to update the stop!" });
    }

    res.status(200).json({ messge: "Stop successfully updated." });
  } catch (error) {
    console.error("Error occured while updating a stop.", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Delete a single stop
const deleteStop = async (req: Request, res: Response) => {
  try {
    const { id, tierId } = req.params;
    const stopFordeletion = await Stop.destroy({
      where: { id: id, tierId: tierId },
    });
    if (!stopFordeletion) {
      return res.status(400).json({ message: "Unable to remove the stop!" });
    }

    res.status(200).json({ messge: "Stop successfully removed." });
  } catch (error) {
    console.error("Error occured while deleting a stop.", error);
    res.status(500).json({ message: "Server error." });
  }
};

export { createStop, findStop, updateStop, deleteStop };
