import { useEffect, useState } from "react";
import { StopApi } from "../../utils/StopApi";
import StopDisplay from "./StopUI";
import { useParams } from "react-router-dom";

export function StopDataFetcher() {
  const [searchResults, setSearchResults] = useState<any[] | null>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkForData, setCheckForData] = useState(true);

  const fetchStopData = async () => {
    try {
      if (searchQuery.trim()) {
        const response = await StopApi.findStop(searchQuery);
        console.log("This is my stop data: ", response);
        setSearchResults(response ? [response] : []);
      } else {
        setSearchResults(null);
      }
    } catch (error) {
      console.error("Error occured while fetching stop data.", error);
    }
  };
  //     useEffect(() => {
  //     fetchStopData();
  //   }, [stopAddress]);

  const handleSearchInput = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitButton = async (e: any) => {
    e.preventDefault();
    setSearchResults(null);
    setCheckForData(true);
    await fetchStopData();
  };

  return (
    <>
      <div>Stops</div>

      <div>
        <input
          type="text"
          value={searchQuery}
          placeholder="search here .."
          onChange={(e) => {
            handleSearchInput(e);
          }}
        />
      </div>
      <button type="button" onClick={handleSubmitButton}>
        {" "}
        Search
      </button>
      <div>
        {checkForData && !searchResults ? (
          <p>No results found!</p>
        ) : (
          searchResults &&
          searchResults.length > 0 && <StopDisplay results={searchResults} />
        )}
      </div>
    </>
  );
}
