import { Request, Response } from "express";
import { MainDriver } from "Models/MainDriverModel.js";

const createMainDriver = async (req: Request, res: Response) => {
  try {
    const { driverFirstName, driverLastName, driverContactNumber } = req.body;

    const newDriver = await MainDriver.create({
      driverFirstName,
      driverLastName,
      driverContactNumber,
    });
    res.status(200).json(newDriver);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { createMainDriver };
