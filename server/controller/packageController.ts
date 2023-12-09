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
  try {
    const foundPackage = await Package.findOne({
      include: {
        all: true,
        nested: true,
      },
      where: {
        packageName: req.params.packageName,
      },
    });

    if (!foundPackage) {
      return res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundPackage);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const updatePackage = async (req: Request, res: Response){
  const {driverId, districtName, packageNumber, packageDescription} = req.body
  try {
   const  packageForUpdate = await Package.findOne({
      where:{packageNumber, }
    })
    if(!packageForUpdate){
      return res.status(400).json({message: "Data not found!"})
    }
    await packageForUpdate.update({
      driverId, districtName, packageNumber, packageDescription
    })
    res.status(200).json({message: "Package successfully updated."})
  }catch(error){
    console.error("Error occured while updating package.")
    res.status(500).json({message: "Server error."})
  }
}


const deleteSinglePackage = async (req: Request, res: Response)=>{
  const {id, packageName} = req.body
  try{
    const packageForDeletion = await Package.findOne({
      where: {id, packageName},
      include: [{all: true, nested: true}]
    })
    if(!packageForDeletion){
      return res.status(400).json({message: "Data not found!"})
    }
    await packageForDeletion.destroy()
    res.status(200).json({message: "Package successfully deleted."})
  }catch(error){
    console.error("Error occurd while deleting package", error)
    res.status(500).json({message: "Server error."})
  }

}

export { createPackageInfo, findAllPackage, findSinglePackage, updatePackage, deleteSinglePackage};
