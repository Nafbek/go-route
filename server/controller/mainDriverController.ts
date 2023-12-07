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
      res.status(400).json({ message: "Data not found!" });
      return;
    }
    res.status(200).json(foundAllDrivers);
  } catch (error) {
    console.error("Error in finding all drivers", error);
    res.status(500).json({ message: "Server error." });
  }
};

//Find a single driver by name with complete package
const findSingleMainDriver = async (req: Request, res: Response) => {
  try {
    const foundSingleMainDriver = await MainDriver.findOne({
      include: [
        {
          all: true,
          nested: true,
          // where: { id: req.params.driver_id },
          where: { driverFirstName: req.body.driverFirstName },
        },
      ],
    });
    if (!foundSingleMainDriver) {
      res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundSingleMainDriver);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

//Find all drivers by school/anchor

const findAllDriversBySchool = async (req: Request, res: Response) => {
  try {
    const foundAllDriversBySchool = await MainDriver.findAndCountAll({
      include: [
        {
          all: true,
          nested: true,
          where: req.body.tierAnchor_school,
        },
      ],
    });
    if (!foundAllDriversBySchool) {
      res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundAllDriversBySchool);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

//Find only list of all drivers with basic personal information
const findOnlyAllDriversProfile = async (req: Request, res: Response) => {
  try {
    const foundOnlyAllDriversProfile = await MainDriver.findAll();

    if (!foundOnlyAllDriversProfile) {
      res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundOnlyAllDriversProfile);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const findOnlySingleDriverProfile = async (req: Request, res: Response) => {
  try {
    const foundOnlySingleDriverProfile = await MainDriver.findOne({
      where: { name: req.body.name },
    });

    if (!foundOnlySingleDriverProfile) {
      res.status(400).json({ message: "Data not found!" });
    }
    res.status(500).json(foundOnlySingleDriverProfile);
  } catch (errr) {
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
};
