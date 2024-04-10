import { useState } from "react";
import { TierApi } from "../utils/TierApi";

export default function Tier() {
  const [tierInfo, setTierInfo] = useState({
    tierAnchor_school: "",
    schoolContactNumber: "",
    packageId: "",
    routeNumber: "",
    shift: "",
    timeStart: "",
    timeEnd: "",
    totalRiders: "",
    runningDays: "",
    totalMiles: "",
    routeDescription: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("");
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setTierInfo({ ...tierInfo, [name]: value });
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const response = await TierApi.createTier({ ...tierInfo });
      console.log("Response data: ", response);
      if (!response) {
        console.error("Error occured while saving route information.");
      } else {
        setTierInfo({
          tierAnchor_school: "",
          schoolContactNumber: "",
          packageId: "",
          routeNumber: "",
          shift: "",
          timeStart: "",
          timeEnd: "",
          totalRiders: "",
          runningDays: "",
          totalMiles: "",
          routeDescription: "",
        });
        setSubmissionStatus("Route successfully saved.");
      }
    } catch (error) {
      console.log("Server error occured.", error);
      setSubmissionStatus("Server error occured while saving the route.");
    }
  };
  return (
    <>
      <div>
        <h1>Tier/route</h1>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="tierAnchor_school">School:</label>
            <input
              type="text"
              id="tierAnchor_school"
              placeholder="shool name"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="schoolContactNumber">School Contact number:</label>
            <input
              type="text"
              id="schoolContactNumber"
              placeholder="school contact number"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="packageNumber">Package id/number:</label>
            <input
              type="number"
              id="packageNumber"
              placeholder="package number"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="routeNumber">Route number:</label>
            <input
              type="text"
              id="routeNumber"
              placeholder="route number"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="shift">Shift</label>
            <input
              type="text"
              id="shift"
              placeholder="shift"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="timeStart">Starting time</label>
            <input
              type="text"
              id="timeStart"
              placeholder="starting time"
              onChange={handleInputChange}
            />
            <label htmlFor="timeEnd">Ending time</label>
            <input type="text" id="timeEnd" placeholder="ending time" />
          </div>
          <div>
            <label htmlFor="totalRiders">Total riders</label>
            <input
              type="text"
              id="totalRiders"
              placeholder="total riders"
              onChange={handleInputChange}
            />
            <label htmlFor="totalMiles">Total miles</label>
            <input type="text" id="totalMiles" placeholder="total mileage" />
          </div>
          <div>
            <label htmlFor="tierAnchor_school">Route/Tier Description:</label>
            <input
              type="text"
              id="routeDescription"
              placeholder="Route/tier description"
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
