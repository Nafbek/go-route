import { Response, Request } from "express";
import { Student } from "../Models/StudentModels.js";

const createStudent = async (req: Request, res: Response) => {
  const { studentFirstName, studentLastName, studentContactNumber } = req.body;

  try {
    const createdStudent = await Student.create({
      studentFirstName,
      studentLastName,
      studentContactNumber,
    });

    res.status(200).json(createdStudent);
  } catch (error) {
    console.error("Error occured while creating student data.", error);
    res.status(500).json({ message: "Server error." });
  }
};

const findSingleStudent = async (res: Response, req: Request) => {
  try {
    const foundSingleStudent = await Student.findByPk();
    if (!foundSingleStudent) {
      return res.status(400).json({ message: "Data not found!" });
    }
    res.status(200).json(foundSingleStudent);
  } catch (error) {
    console.error("Error occured while fetching student data.", error);
    res.status(500).json({ message: "Server error." });
  }
};

const updateStudent = async (req: Request, res: Response) => {
  const { studentFirstName, studentLastName, studentContactNumber } = req.body;
  try {
    const studentForUpdate = await Student.findOne({
      where: { id: req.params.id },
      include: [
        {
          all: true,
          nested: true,
        },
      ],
    });
    if (!studentForUpdate) {
      return res.status(400).json({ message: "Data not found!" });
    }

    await studentForUpdate.update({
      studentFirstName,
      studentLastName,
      studentContactNumber,
    });
    res.status(200).json({ message: "Student data successfully updated." });
  } catch (erro) {
    console.error("Error occured while updating data.");
    res.status(500).json({ message: "Server error." });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentForDeletion = await Student.findOne({
      where: { id: req.params.id },
      include: [{ all: true, nested: true }],
    });

    if (!studentForDeletion) {
      return res.status(400).json({ message: "Data not found!" });
    }
    await studentForDeletion.destroy();
    res.status(200).json({ message: "Student successfully deleted." });
  } catch (error) {
    console.error("Error occured while deleting student data.");
    res.status(500).json({ message: "Server error." });
  }
};
export { createStudent, findSingleStudent, updateStudent, deleteStudent };
