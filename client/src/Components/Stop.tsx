import { useState } from "react";
import { StopApi } from "../utils/StopApi";

export default function Stop() {
  const [stopInfo, setStopInfo] = useState({
    tier_id: "",
    stopName: "",
    stopAddress: "",
    destinationAddress: "",
    pickupTime_home: "",
    dropoffTime_home: "",
    pickupTime_school: "",
    dropoffTime_school: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setStopInfo({ ...stopInfo, [name]: value });
  };
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const response = await StopApi.createStop({ ...stopInfo });
      if (!response) {
        console.error("Something went wrong.");
      } else {
        setStopInfo({
          tier_id: "",
          stopName: "",
          stopAddress: "",
          destinationAddress: "",
          pickupTime_home: "",
          dropoffTime_home: "",
          pickupTime_school: "",
          dropoffTime_school: "",
        });
        setSubmissionStatus("Data saved successfully created.");
      }
    } catch (error) {
      console.error("Server error occured.", error);
      setSubmissionStatus(
        "Server error occured while saving the stop address."
      );
    }
  };
  return (
    <>
      <div>
        <h1>Address info</h1>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label>Pickup Address name:</label>
            <input
              type="text"
              id="stopName"
              placeholder="address name"
              onChange={handleInputChange}
            />
            <label>Pickup Street number/address</label>
            <input
              type="text"
              id="stopAddress"
              placeholder="street number"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Drop-off address number</label>
            <input
              type="text"
              id="destinationAddress"
              placeholder="drop-off address"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Pick up time from home</label>
            <input
              type="text"
              id="pickupTime_home"
              placeholder="pick time from home"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Dropoff time at school</label>
            <input
              type="text"
              id="dropoffTime_school"
              placeholder="drop-off time at school"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Pick up time from school</label>
            <input
              type="text"
              id="pickupTime_school"
              placeholder="pick time from school"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Dropoff time at home</label>
            <input
              type="text"
              id="dropoffTime_home"
              placeholder="drop-off time at home"
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
