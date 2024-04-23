// Find all drivers with basic profile

import { useParams } from "react-router-dom";
import { MainDriverApi } from "../../utils/MainDriverAPI";

const findAllDrivers = async () => {
  try {
    const response = await MainDriverApi.getAllMainDriver();
    console.log("All Drivers:", response);
  } catch (error) {
    console.error("Error occured while fetching all drivers:", error);
  }
};

const findOnlySingleDriverProfile = async () => {
  const { driverFirstName } = useParams();
  try {
    const response = await MainDriverApi.getOnlySingleDriverProfile(
      driverFirstName!
    );
  } catch (error) {
    console.error(
      "Error occured while fetching a single driver by name:",
      error
    );
  }
};
