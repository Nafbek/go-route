var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Student } from "../Models/StudentModels.js";
import { Package } from "../Models/PackageModel.js";
import { Tier } from "../Models/TierModel.js";
import { Stop } from "../Models/StopModel.js";
// Create a student
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stopId, studentFirstName, studentLastName, studentContactNumber, studentDescription, } = req.body;
    try {
        const createdStudent = yield Student.create({
            stopId,
            studentFirstName,
            studentLastName,
            studentContactNumber,
            studentDescription,
        });
        res.status(200).json(createdStudent);
    }
    catch (error) {
        console.error("Error occured while creating student data.", error);
        res.status(500).json({ message: "Server error." });
    }
});
// Find a single student
const findSingleStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const foundSingleStudent = yield Student.findOne({
            include: [
                {
                    model: Package,
                    include: [
                        { model: Tier, include: [{ model: Stop, as: "StudentAtStop" }] },
                    ],
                },
            ],
            where: { id: id },
        });
        if (!foundSingleStudent) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json(foundSingleStudent);
    }
    catch (error) {
        console.error("Error occurred while fetching student data.", error);
        res.status(500).json({ message: "Server error." });
    }
});
// const updateStudent = async (req: Request, res: Response) => {
//   const {
//     stopId,
//     studentFirstName,
//     studentLastName,
//     studentContactNumber,
//     studentDescription,
//   } = req.body;
//   try {
//     const studentForUpdate = await Student.findOne({
//       where: { id: req.params.id },
//     });
//     if (!studentForUpdate) {
//       return res.status(400).json({ message: "Data not found!" });
//     }
//     await studentForUpdate.update({
//       stopId,
//       studentFirstName,
//       studentLastName,
//       studentContactNumber,
//       studentDescription,
//     });
//     res.status(200).json({ message: "Student data successfully updated." });
//   } catch (erro) {
//     console.error("Error occured while updating data.");
//     res.status(500).json({ message: "Server error." });
//   }
// };
// Update student data
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { stopId, studentFirstName, studentLastName, studentContactNumber, studentDescription, } = req.body;
    const { id } = req.params;
    try {
        const studentForUpdate = yield Student.update({
            stopId,
            studentFirstName,
            studentLastName,
            studentContactNumber,
            studentDescription,
        }, { where: { id: id } });
        if (!studentForUpdate) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json({ message: "Student data successfully updated." });
    }
    catch (erro) {
        console.error("Error occured while updating data.");
        res.status(500).json({ message: "Server error." });
    }
});
// Delete a single student from the adress
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, stopId } = req.params;
    try {
        const studentForDeletion = yield Student.destroy({
            where: { id: id, stopId },
        });
        if (!studentForDeletion) {
            return res.status(400).json({ message: "Data not found!" });
        }
        res.status(200).json({ message: "Student successfully deleted." });
    }
    catch (error) {
        console.error("Error occured while deleting student data.");
        res.status(500).json({ message: "Server error." });
    }
});
export { createStudent, findSingleStudent, updateStudent, deleteStudent };
