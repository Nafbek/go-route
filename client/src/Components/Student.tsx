import { useState } from "react";
import { StudentApi } from "../utils/StudentApi";

export default function Student() {
  const [studentInfo, setStudentInfo] = useState({
    studentFirstName: "",
    studentLastName: "",
    studentContactNumber: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("");
  const handleInputChange = (e: any) => {
    const [name, value] = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const response = await StudentApi.createStudent({ ...studentInfo });
      if (!response) {
        console.error("Something went wrong.");
        setSubmissionStatus(
          "Something went wrong while creating students' data."
        );
      } else {
        setStudentInfo({
          studentFirstName: "",
          studentLastName: "",
          studentContactNumber: "",
        });
        setSubmissionStatus("Students' data successfully created.");
      }
    } catch (error) {
      console.error("Server error occured", error);
      setSubmissionStatus(
        "Server error occured while creating students' data."
      );
    }
  };
  return (
    <>
      <div>
        <h1>Student info</h1>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label>Student Name</label>
            <input
              type="text"
              id="studentFirstName"
              placeholder="student first name"
              onChange={handleInputChange}
            />
            <label>Student last name</label>
            <input
              type="text"
              id="studentLastName"
              placeholder="student last name"
              onChange={handleInputChange}
            />
            <label>Student contact number</label>
            <input
              type="text"
              id="studentContactNumber"
              placeholder="student contact number"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
      {submissionStatus && <p>{submissionStatus}</p>}
    </>
  );
}
