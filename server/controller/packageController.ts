import { Request, Response } from "express";
import { Package } from "Models/PackageModel.js";

const createPackageInfo = async (req: Request, res: Response) => {
  const { packageName, packageNumber, packageDescription } = req.body;
  try {
    const createdPackageInfo = await Package.create({
      packageName,
      packageNumber,
      packageDescription,
      include: {
        all: true,
        nested: true,
      },
    });
    if (!createdPackageInfo) {
      res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json({ message: "Package info is created." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const findPackage = async (req: Request, res: Response) => {
  try {
    const foundPackage = await Package.findAndCountAll({
      include: {
        all: true,
        nested: true,
      },
      where: {
        packageName: req.body.packageName,
      },
      offset: 8,
      limit: 2,
    });

    if (!foundPackage) {
      res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundPackage);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

export { createPackageInfo, findPackage };
