import { useParams } from "react-router-dom";
import { MainDriverApi } from "../../utils/MainDriverAPI";
import { useEffect, useState } from "react";
import { DriverUI, SingleDriverDetails } from "./MainDriverUI";

export default function MainDriverFetchData() {
  const [searchResults, setSearchResults] = useState<any[] | null>();
  const [searchQuery, setSearchQuery] = useState("");

  const { driverFirstName, tierAnchor_school } = useParams();

  const fetchData = async () => {
    let response: any;

    try {
      if (searchQuery && driverFirstName) {
        // response = await MainDriverApi.getSingleDriver(driverFirstName);

        response =
          await MainDriverApi.getOnlySingleDriverProfile(driverFirstName);
      } else if (tierAnchor_school) {
        response = await MainDriverApi.getAllDriverBySchool(tierAnchor_school);
      } else {
        response = await MainDriverApi.getAllMainDriver();
      }

      setSearchResults(response);
    } catch (error) {
      console.error("Error occured while fetching data", error);
    }
  };
  // useEffect(() => {
  //   if (searchQuery) {
  //     fetchData();
  //   }
  // }, [driverFirstName, tierAnchor_school, searchQuery]);

  // useEffect(() => {
  //   try {
  //     const response = await MainDriverApi.getOnlySingleDriverProfile(
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

  const handleSearchButton = (e: any) => {
    e.preventDefault();
    setSearchResults(null);
    fetchData();
  };
  return (
    <>
      <div>
        <form onSubmit={handleSearchButton}>
          <div>
            <h1>Driver's related data:</h1>
          </div>
          <input
            type="textx"
            value={searchQuery}
            placeholder="search here...."
            onChange={(e) => {
              handleSearchInputChange(e);
            }}
          />
          <button type="submit">submit</button>
        </form>
      </div>

      <div>Results</div>
      {searchResults && searchQuery && searchResults.length > 0 ? (
        <DriverUI results={searchResults} />
      ) : (
        <SingleDriverDetails driverDetails={searchResults} />
      )}
      {searchQuery && searchResults === null && <p>No results found</p>}
    </>
  );
}
