import { useEffect, useState } from "react";
import { TierApi } from "../../utils/TierApi";
import { useParams } from "react-router-dom";
import { MultipleTiers, SingleTierDetails } from "./TierUI";

export default function TierDataFetcher() {
  const [searchresults, setSearchResults] = useState<any[] | null>([]);
  const [searchquery, setSearchQuery] = useState("");
  const [checkForData, setCheckForData] = useState(false);

  const { tierAnchor_school, timeStart } = useParams();

  const fetchTierData = async () => {
    try {
      if (searchquery === "tierAnchor_school") {
        const response = await TierApi.findTierBySchool(tierAnchor_school!);
        setSearchResults(response);
      } else if (searchquery === "timerStart") {
        const response = await TierApi.findTierByTime(timeStart);
        setSearchResults(response);
      } else {
        setSearchResults(null);
      }
    } catch (error) {
      console.log("Error occured while fetching tier data.", error);
    }
  };
  useEffect(() => {
    fetchTierData();
  }, [tierAnchor_school, timeStart, searchquery]);

  const handleSearchInput = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitButton = (e: any) => {
    e.preventDefault();
    setCheckForData(true);
  };

  return (
    <>
      <div>Tier</div>
      <div>
        <input
          type="text"
          value={searchquery}
          placeholder="search here..."
          onChange={(e) => {
            handleSearchInput(e);
          }}
        />
      </div>
      <button type="button" onClick={handleSubmitButton}>
        Search
      </button>

      <div>
        {checkForData && (!searchresults || searchresults.length === 0) && (
          <p>No results found!</p>
        )}

        {searchresults && searchresults.length > 0 ? (
          <MultipleTiers multipleResults={searchresults} />
        ) : (
          searchresults !== null && (
            <SingleTierDetails singleTier={searchresults} />
          )
        )}
      </div>
    </>
  );
}
