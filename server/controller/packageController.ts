import { Request, Response } from "express";
// import { Package } from "../Models/PackageModel.js";
// import { Tier } from "../Models/TierModel.js";
// import { Stop } from "../Models/StopModel.js";
// import { Student } from "../Models/StudentModels.js";
// import { MainDriver } from "Models/MainDriverModel.js";
import { MainDriver, Package, Tier, Stop, Student } from "../Models/index.js";

// Create package with
const createPackageInfo = async (req: Request, res: Response) => {
  const { packageNumber, districtName, packageDescription, driverId } =
    req.body;
  try {
    const createdPackageInfo = await Package.create({
      driverId,
      packageNumber,
      districtName,
      packageDescription,
    });

    res.status(200).json(createdPackageInfo);
  } catch (error) {
    console.error("Error occured while creating package.", error);
    res.status(500).json({ message: "Server error." });
  }
};

const findAllPackage = async (req: Request, res: Response) => {
  try {
    const foundAllPackage = await Package.findAll();
    if (!foundAllPackage) {
      return res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundAllPackage);
  } catch (error) {
    console.error("Error in finding all drivers", error);
    res.status(500).json({ message: "Server error" });
  }
};

const findSinglePackage = async (req: Request, res: Response) => {
  const { packageNumber } = req.params;
  try {
    const foundPackage = await Package.findOne({
      where: {
        packageNumber: packageNumber,
      },
      include: [
        { model: MainDriver },
        {
          model: Tier,
          include: [
            {
              model: Stop,
              as: "stops",
              include: [{ model: Student, as: "students" }],
            },
          ],
        },
      ],
    });

    if (!foundPackage) {
      return res.status(400).json({ message: "Data not found!" });
    }
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(foundPackage);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const updatePackage = async (req: Request, res: Response) => {
  const { driverId, districtName, packageNumber, packageDescription } =
    req.body;
  try {
    const packageForUpdate = await Package.update(
      { driverId, districtName, packageNumber, packageDescription },
      {
        where: { packageNumber: req.params.packageNumber },
        // returning: true,
        // logging: console.log,
      }
    );
    if (!packageForUpdate) {
      return res
        .status(400)
        .json({ message: "Data not found for the update!" });
    }

    res.status(200).json({ message: "Package successfully updated." });
  } catch (error) {
    console.error("Error occured while updating package.", error);
    res.status(500).json({ message: "Server error." });
  }
};
const deleteSinglePackage = async (req: Request, res: Response) => {
  try {
    const packageForDeletion = await Package.destroy({
      where: {
        packageNumber: req.params.packageNumber,
      },
    });
    if (!packageForDeletion) {
      return res.status(400).json({ message: "Data not found!" });
    }

    res.status(200).json({ message: "Package successfully deleted." });
  } catch (error) {
    console.error("Error occurd while deleting package", error);
    res.status(500).json({ message: "Server error." });
  }
};

export {
  createPackageInfo,
  findAllPackage,
  findSinglePackage,
  updatePackage,
  deleteSinglePackage,
};
