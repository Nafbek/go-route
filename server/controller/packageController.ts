import { Request, Response } from "express";
import { Package } from "../Models/PackageModel.js";

// Create package with
const createPackageInfo = async (req: Request, res: Response) => {
  const { packageName, packageNumber, districtName, packageDescription } =
    req.body;
  try {
    const createdPackageInfo = await Package.create({
      packageName,
      packageNumber,
      districtName,
      packageDescription,
      include: {
        all: true,
        nested: true,
      },
    });

    res.status(200).json(createdPackageInfo);
  } catch (error) {
    console.error("Error occured while creating package.");
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
      include: {
        all: true,
        nested: true,
      },
      where: {
        packageNumber: packageNumber,
      },
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
    const [affectedRow, packageForUpdate] = await Package.update(
      { driverId, districtName, packageNumber, packageDescription },
      {
        where: { packageNumber },
        returning: true,
        logging: console.log,
      }
    );
    if (
      affectedRow === 0 ||
      !packageForUpdate ||
      packageForUpdate.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Data not found for the update!" });
    }

    const updatedPackage = packageForUpdate[0];
    res
      .status(200)
      .json({ message: "Package successfully updated.", updatedPackage });
  } catch (error) {
    console.error("Error occured while updating package.", error);
    res.status(500).json({ message: "Server error." });
  }
};

const deleteSinglePackage = async (req: Request, res: Response) => {
  const { id, packageNumber } = req.body;
  try {
    const packageForDeletion = await Package.destroy({
      where: { id, packageNumber },
      // include: [{ all: true, nested: true }],
    });
    if (!packageForDeletion) {
      return res.status(400).json({ message: "Data not found!" });
    }
    // await packageForDeletion.destroy();
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
