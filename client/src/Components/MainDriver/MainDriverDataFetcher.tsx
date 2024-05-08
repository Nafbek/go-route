import { useParams } from "react-router-dom";
import { MainDriverApi } from "../../utils/MainDriverAPI";
import { useEffect, useState } from "react";
import { DriverUI, SingleDriverDetails } from "./MainDriverUI";

export default function MainDriverFetchData() {
  const [searchResults, setSearchResults] = useState<any[] | null>();
  const [searchQuery, setSearchQuery] = useState("");
  const [checkForData, setCheckForData] = useState(false);

  const { driverFirstName, tierAnchor_school } = useParams();

  const fetchData = async () => {
    let response: any;

    try {
      if (searchQuery.trim()) {
        // response = await MainDriverApi.findSingleDriver(driverFirstName);

        response = await MainDriverApi.findOnlySingleDriverProfile(searchQuery);
        console.log("driver", response);
        setSearchResults(response ? [response] : []);
      } else if (searchQuery.trim()) {
        response = await MainDriverApi.findAllDriversBySchool(searchQuery);
        setSearchResults(response);
      } else {
        setSearchResults(null);
      }
    } catch (error) {
      console.error("Error occured while fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [driverFirstName, tierAnchor_school]);

  // useEffect(() => {
  //   try {
  //     const response = await MainDriverApi.findOnlySingleDriverProfile(
  //       driverFirstName!
  //     );
  //     if (!response) {
  //       setSearchResults(response);
  //     }
  //   } catch (error) {
  //     console.error("Error occured while fetching data", error);
  //   }
  // }, []);
  const handleSearchInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButton = async (e: any) => {
    e.preventDefault();
    setSearchResults(null);
    console.log("button clicked");
    setCheckForData(true);

    await fetchData();
  };

  const fetchAllDriversList = async () => {
    try {
      const response = await MainDriverApi.findAllDrivers();
      setSearchResults(response);
    } catch (error) {
      console.error("Error occured occured while fetching list of drivers");
    }
  };

  const handleListOfDrivers = async (e: any) => {
    await fetchAllDriversList();
  };

  return (
    <>
      <div>
        <div>
          <h1>Driver's related data:</h1>
        </div>
        <input
          type="text"
          value={searchQuery}
          placeholder="search here...."
          onChange={(e) => {
            handleSearchInputChange(e);
          }}
        />
      </div>
      <button type="button" onClick={handleSearchButton}>
        submit
      </button>
      <div>
        <button type="submit" onClick={handleListOfDrivers}>
          Now search all drivers
        </button>
      </div>

      {checkForData && (!searchResults || searchResults.length === 0) && (
        <p>No results found</p>
      )}

      {searchResults && searchResults.length > 0 ? (
        <DriverUI results={searchResults} />
      ) : (
        searchResults !== null && (
          <SingleDriverDetails driverDetails={searchResults} />
        )
      )}
    </>
  );
}
