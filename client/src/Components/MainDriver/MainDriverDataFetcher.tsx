import { useParams } from "react-router-dom";
import { MainDriverApi } from "../../utils/MainDriverAPI";
import { useEffect, useState } from "react";
import { DriverUI, SingleDriverDetails } from "./MainDriverUI";

export default function MainDriverFetchData() {
  const [searchResults, setSearchResults] = useState<any[] | null>();
  const [searchQuery, setSearchQuery] = useState("");
  const [checkForData, setCheckForData] = useState(false);

  const { driverFirstName, tierAnchor_school } = useParams();

  const fetchData = async (query: string = "") => {
    let response: any;

    try {
      if (query.trim()) {
        // response = await MainDriverApi.findSingleDriver(driverFirstName);

        response = await MainDriverApi.findOnlySingleDriverProfile(query);
        console.log("driver", response);
        setSearchResults(response ? [response] : []);
      }
      // else if (tierAnchor_school.trim()) {
      //   response =
      //     await MainDriverApi.findAllDriversBySchool(tierAnchor_school);
      //   setSearchResults(response);
      // }
      else {
        const response = await MainDriverApi.findAllDrivers();
        setSearchResults(response);
      }
      setCheckForData(true);
    } catch (error) {
      console.error("Error occured while fetching data", error);
      setSearchResults([]);
      setCheckForData(true);
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchData(searchQuery);
    }
  }, [searchQuery]);

  const handleSearchInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButton = async (e: any) => {
    e.preventDefault();
    setSearchResults(null);
    setCheckForData(true);

    await fetchData(searchQuery);
  };

  // const fetchAllDriversList = async () => {
  //   try {
  //     const response = await MainDriverApi.findAllDrivers();
  //     setSearchResults(response);
  //   } catch (error) {
  //     console.error("Error occured occured while fetching list of drivers");
  //   }
  // };

  const handleListOfDrivers = async (e: any) => {
    e.preventDefault();
    setSearchQuery("");
    await fetchData();
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
      {checkForData && searchResults && searchResults.length > 0 ? (
        searchResults[0]?.Packages ? (
          <SingleDriverDetails driverDetails={searchResults} />
        ) : (
          <DriverUI results={searchResults} />
        )
      ) : (
        checkForData &&
        searchResults &&
        searchResults.length === 0 && <p>No results found</p>
      )}
    </>
  );
}
