import { Request, Response } from "express";
import { MainDriver } from "../Models/MainDriverModel.js";

//Create driver with complete package
const createMainDriver = async (req: Request, res: Response) => {
  try {
    const {
      driverFirstName,
      driverLastName,
      driverContactNumber,
      driverSecondContactNumber,
    } = req.body;

    const newDriver = await MainDriver.create(
      {
        driverFirstName,
        driverLastName,
        driverContactNumber,
        driverSecondContactNumber,
      },
      {
        include: [
          {
            all: true,
            nested: true,
          },
        ],
      }
    );
    res.status(200).json(newDriver);
  } catch (error) {
    console.error("Error occured while creating driver data.", error);
    res.status(500).json({ message: "Server error." });
  }
};

//find all drivers with complete package
const findAllDrivers = async (req: Request, res: Response) => {
  try {
    const foundAllDrivers = await MainDriver.findAll({
      include: { all: true, nested: true },
      logging: console.log,
    });
    console.log("Drivers found: ", foundAllDrivers);
    if (!foundAllDrivers) {
      return res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundAllDrivers);
  } catch (error) {
    console.error("Error in finding all drivers", error);
    res.status(500).json({ message: "Server error." });
  }
};

//Find a single driver by name with complete package
const findSingleMainDriver = async (req: Request, res: Response) => {
  const { driverFirstName } = req.params;
  try {
    const foundSingleMainDriver = await MainDriver.findOne({
      include: [
        {
          all: true,
          nested: true,
          // where: { id: req.params.driver_id },
          where: { driverFirstName: driverFirstName },
        },
      ],
    });
    if (!foundSingleMainDriver) {
      res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundSingleMainDriver);
  } catch (error) {
    console.error("Error occured while fetching a single driver data.", error);
    res.status(500).json({ message: "Server error." });
  }
};

//Find all drivers by school/anchor

const findAllDriversBySchool = async (req: Request, res: Response) => {
  const { tierAnchor_school } = req.params;
  try {
    const foundAllDriversBySchool = await MainDriver.findAndCountAll({
      include: [
        {
          all: true,
          nested: true,
          where: { tierAnchor_school: tierAnchor_school },
        },
      ],
    });
    if (!foundAllDriversBySchool) {
      return res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundAllDriversBySchool);
  } catch (error) {
    console.error("Error occured while fetching driver by school they go to.");
    res.status(500).json({ message: "Server error." });
  }
};

//Find only list of all drivers with basic personal information
const findOnlyAllDriversProfile = async (req: Request, res: Response) => {
  try {
    const foundOnlyAllDriversProfile = await MainDriver.findAll();

    if (!foundOnlyAllDriversProfile) {
      return res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundOnlyAllDriversProfile);
  } catch (error) {
    console.error("Error occured while fetching all drivers' profile", error);
    res.status(500).json({ message: "Server error" });
  }
};

const findOnlySingleDriverProfile = async (req: Request, res: Response) => {
  const { driverFirstName } = req.params;
  try {
    const foundOnlySingleDriverProfile = await MainDriver.findOne({
      where: { driverFirstName: driverFirstName },
    });

    if (!foundOnlySingleDriverProfile) {
      return res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundOnlySingleDriverProfile);
  } catch (error) {
    console.error("Error occured while fetching a driver profile.", error);
    res.status(500).json({ message: "Server error." });
  }
};

const updateDriver = async (req: Request, res: Response) => {
  const {
    id,
    driverFirstName,
    driverLastName,
    driverContactNumber,
    driverSecondContactNumber,
  } = req.body;
  try {
    const driverForUpdate = await MainDriver.findOne({
      where: { driverFirstName, driverLastName, id },
      include: [{ all: true, nested: true }],
    });
    if (!driverForUpdate) {
      return res.status(400).json({ message: "Data not found!" });
    }
    await driverForUpdate.update({
      driverFirstName,
      driverLastName,
      driverContactNumber,
      driverSecondContactNumber,
    });
    res.status(200).json({ message: "Driver successfully updated." });
  } catch (error) {
    console.error("Error occured while updating driver", error);
    res.status(500).json({ message: "Server error." });
  }
};

const deleteSingleDriver = async (req: Request, res: Response) => {
  const { id, driverFirstName } = req.body;
  try {
    const driverForDeletion = await MainDriver.findOne({
      where: { id, driverFirstName },
      include: [{ all: true, nested: true }],
    });
    if (!driverForDeletion) {
      return res.status(400).json({ message: "Data not found!" });
    }
    await driverForDeletion.destroy();
    res.status(200).json({ message: "Driver successfully removed." });
  } catch (error) {
    console.error("Error occured while deleting driver", error);
    res.status(500).json({ message: "Server error." });
  }
};

export {
  createMainDriver,
  findAllDrivers,
  findAllDriversBySchool,
  findSingleMainDriver,
  findOnlyAllDriversProfile,
  findOnlySingleDriverProfile,
  updateDriver,
  deleteSingleDriver,
};
