import { MainDriver } from "../Models/MainDriverModel.js";
import { Package } from "../Models/PackageModel.js";
import { Stop } from "../Models/StopModel.js";
import { Student } from "../Models/StudentModels.js";
import { Tier } from "../Models/TierModel.js";
import fs from "fs";

//Read the data synchronously and parse it
const driverRawData = fs.readFileSync(".dist/driverSeed.json", "utf-8");
const driverData = JSON.parse(driverRawData);

//Define an asynchronous function for bulk insertion
const bulkCreateDriver = async () => {
  try {
    console.log(driverData);
    await MainDriver.bulkCreate(driverData);
    console.log("MainDriver records inserted successfully.");
  } catch (error) {
    console.error("Error while inserting MainDriver records", error);
  }
};

//Read the data synchronously and parse it
const packageRawData = fs.readFileSync("./packageSeed.json", "utf-8");
const packageData = JSON.parse(packageRawData);

//Define an asynchronous function for bulk insertion
const bulkCreatePackage = async () => {
  try {
    await Package.bulkCreate(packageData);
    console.log("Package records inserted successfully.");
  } catch (error) {
    console.error("Error while inserting Package records", error);
  }
};

//Read the data synchronously and parse it
const tierRawData = fs.readFileSync("./tierSeed.json", "utf-8");
const tierData = JSON.parse(tierRawData);

//Define an asynchronous function for bulk insertion
const bulkCreateTier = async () => {
  try {
    await Tier.bulkCreate(tierData);
    console.log("Tier records inserted successfully.");
  } catch (error) {
    console.error("Error while inserting Tier records", error);
  }
};

//Read the data synchronously and parse it
const stopRawData = fs.readFileSync("./stopSeed.json", "utf-8");
const stopData = JSON.parse(stopRawData);

//Define an asynchronous function for bulk insertion
const bulkCreateStop = async () => {
  try {
    await Stop.bulkCreate(stopData);
    console.log("Stop records inserted successfully.");
  } catch (error) {
    console.error("Error while inserting Stop records", error);
  }
};

//Read the data synchronously and parse it
const studentRawData = fs.readFileSync("./studentSeed.json", "utf-8");
const studentData = JSON.parse(studentRawData);

//Define an asynchronous function for bulk insertion
const bulkCreateStudent = async () => {
  try {
    await Student.bulkCreate(studentData);
    console.log("Student records inserted successfully.");
  } catch (error) {
    console.error("Error while inserting Student records", error);
  }
};

//Call functions
bulkCreateDriver();
bulkCreatePackage();
bulkCreateTier();
bulkCreateStop();
bulkCreateStudent();
