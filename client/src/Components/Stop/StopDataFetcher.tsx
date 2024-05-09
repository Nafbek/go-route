import { useEffect, useState } from "react";
import { StopApi } from "../../utils/StopApi";
import StopDisplay from "./StopUI";

export function StopDataFetcher() {
  const [searchResults, setSearchResults] = useState<any[] | null>();
  const [searchQuery, setSearchQuery] = useState("");
  const [checkForData, setCheckForData] = useState(true);

  useEffect(() => {
    const fetchStopData = async () => {
      try {
        const response = await StopApi.findStop();

        if (response) {
          setSearchResults(response ? [response] : []);
        } else {
          setSearchResults(null);
        }
      } catch (error) {
        console.error("Error occured while fetching stop data.", error);
      }
    };
    fetchStopData();
  }, [searchQuery]);

  const handleSearchInput = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitButton = (e: any) => {
    e.preventDefault();
    setCheckForData(true);
  };

  return (
    <>
      <div>Stops</div>

      <div>
        <input
          type="text"
          value={searchQuery}
          placeholder="search here .."
          onChange={handleSearchInput}
        />
      </div>
      <button type="button" onClick={handleSubmitButton}>
        {" "}
        Search
      </button>
      <div>
        {checkForData && (!searchResults || searchResults.length === 0) && (
          <p>No results found!</p>
        )}
        {searchResults !== null && <StopDisplay results={searchResults} />}
      </div>
    </>
  );
}
