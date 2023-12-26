var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const bulkCreateDriver = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(driverData);
        yield MainDriver.bulkCreate(driverData);
        console.log("MainDriver records inserted successfully.");
    }
    catch (error) {
        console.error("Error while inserting MainDriver records", error);
    }
});
//Read the data synchronously and parse it
const packageRawData = fs.readFileSync("./packageSeed.json", "utf-8");
const packageData = JSON.parse(packageRawData);
//Define an asynchronous function for bulk insertion
const bulkCreatePackage = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Package.bulkCreate(packageData);
        console.log("Package records inserted successfully.");
    }
    catch (error) {
        console.error("Error while inserting Package records", error);
    }
});
//Read the data synchronously and parse it
const tierRawData = fs.readFileSync("./tierSeed.json", "utf-8");
const tierData = JSON.parse(tierRawData);
//Define an asynchronous function for bulk insertion
const bulkCreateTier = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Tier.bulkCreate(tierData);
        console.log("Tier records inserted successfully.");
    }
    catch (error) {
        console.error("Error while inserting Tier records", error);
    }
});
//Read the data synchronously and parse it
const stopRawData = fs.readFileSync("./stopSeed.json", "utf-8");
const stopData = JSON.parse(stopRawData);
//Define an asynchronous function for bulk insertion
const bulkCreateStop = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Stop.bulkCreate(stopData);
        console.log("Stop records inserted successfully.");
    }
    catch (error) {
        console.error("Error while inserting Stop records", error);
    }
});
//Read the data synchronously and parse it
const studentRawData = fs.readFileSync("./studentSeed.json", "utf-8");
const studentData = JSON.parse(studentRawData);
//Define an asynchronous function for bulk insertion
const bulkCreateStudent = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Student.bulkCreate(studentData);
        console.log("Student records inserted successfully.");
    }
    catch (error) {
        console.error("Error while inserting Student records", error);
    }
});
//Call functions
bulkCreateDriver();
bulkCreatePackage();
bulkCreateTier();
bulkCreateStop();
bulkCreateStudent();
