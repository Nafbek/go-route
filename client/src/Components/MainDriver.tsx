import { useState } from "react";
import { MainDriverApi } from "../utils/API";

export default function MainDriver() {
  const [formSubmissionStatus, setFormSubmissionStatus] = useState("");
  const [driverFormData, setDriverFormData] = useState({
    driverFirstName: "",
    driverSecondName: "",
    driverContactNumber: "",
    driverSecondContactNumber: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDriverFormData({ ...driverFormData, [name]: value });
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    console.log("Submit button is clicked.");

    try {
      const response = await MainDriverApi.createMainDriver({
        ...driverFormData,
      });
      console.log("Server Response for driver data:", response);

      if (!response) {
        console.log("Error occured while submitting driver's data");
        setFormSubmissionStatus(
          "Error occured while submitting driver's data. Please try again."
        );
      } else {
        setDriverFormData({
          driverFirstName: "",
          driverSecondName: "",
          driverContactNumber: "",
          driverSecondContactNumber: "",
          password: "",
        });
        setFormSubmissionStatus("Form submitted successfully.");
      }
    } catch (error) {
      console.log("Server Error occured while submitting driver's data.");
      setFormSubmissionStatus(
        "Server Error occured while submitting driver's data. Please try again."
      );
    }
  };

  return (
    <>
      <div>
        <h2>Driver's form</h2>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="driverFirstName">First Name:</label>
            <input
              type="text"
              id="driverFirstName"
              name="driverFirstName"
              placeholder="first Name"
              className=""
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="driverSecondName">Second Name:</label>
            <input
              type="text"
              id="driverSecondName"
              name="driverSecondName"
              placeholder="second Name"
              className=""
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="driverContactNumber">Main Phone Number:</label>
            <input
              type="text"
              id="driverContactNumber"
              name="driverContactNumber"
              placeholder="Main Phone Number"
              className=""
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="driverSecondContactNumber">
              Optional Phone Number:
            </label>
            <input
              type="text"
              id="driverSecondContactNumber"
              name="driverSecondContactNumber"
              placeholder="Optional Phone Number"
              className=""
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="password"
              className=""
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Submit form</button>
        </form>

        {formSubmissionStatus && <p>{formSubmissionStatus}</p>}
      </div>
    </>
  );
}
