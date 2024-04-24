import { useParams } from "react-router-dom";
import { MainDriverApi } from "../../utils/MainDriverAPI";
import { useEffect, useState } from "react";

export default function MainDriverFetchData() {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { driverFirstName, tierAnchor_school } = useParams();

  useEffect(() => {
    const findAllDrivers = async () => {
      try {
        const response: string[] | null =
          await MainDriverApi.getAllMainDriver();
        console.log("All Drivers:", response);
        if (response !== null) {
          setSearchResults(response);
        }
      } catch (error) {
        console.error("Error occured while fetching all drivers:", error);
      }
    };
    findAllDrivers();
  }, []);

  useEffect(() => {
    const findsingleDriver = async () => {
      try {
        const response = await MainDriverApi.getSingleDriver(driverFirstName!);
        console.log("All Drivers:", response);
      } catch (error) {
        console.error("Error occured while fetching all drivers:", error);
      }
    };
  }, [driverFirstName]);

  useEffect(() => {
    const findOnlySingleDriverProfile = async () => {
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
    if (driverFirstName) {
      findOnlySingleDriverProfile();
    }
  }, [driverFirstName]);

  useEffect(() => {
    const findAllDriversBySchool = async () => {
      try {
        const response = await MainDriverApi.getAllDriverBySchool(
          tierAnchor_school!
        );
        console.log("All Drivers:", response);
      } catch (error) {
        console.error("Error occured while fetching all drivers:", error);
      }
    };
  }, [tierAnchor_school]);
  const handleSearchInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div>
        <h1>Driver's related data:</h1>
        <input
          type="textx"
          value="???"
          placeholder="search here...."
          onChange={(e) => {
            handleSearchInputChange;
          }}
        />
      </div>
    </>
  );
}
