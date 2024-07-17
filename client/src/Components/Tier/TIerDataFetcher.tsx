import { useEffect, useState } from "react";
import { TierApi } from "../../utils/TierApi";
import { useParams } from "react-router-dom";
import { MultipleTiers, SingleTierDetails } from "./TierUI";

export default function TierDataFetcher() {
  const [searchresults, setSearchResults] = useState<any[] | null>([]);
  const [searchquery, setSearchQuery] = useState("");
  const [checkForData, setCheckForData] = useState(false);

  const fetchTierData = async () => {
    try {
      if (searchquery.trim()) {
        const response = await TierApi.findTierBySchoolOrRouteNumber(
          searchquery!
        );
        setSearchResults([response]);
      } else {
        setSearchResults(null);
      }
    } catch (error) {
      console.log("Error occured while fetching tier data.", error);
    }
  };

  const handleSearchInput = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitButton = async (e: any) => {
    e.preventDefault();
    setSearchResults(null);
    setCheckForData(true);
    await fetchTierData();
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
        <button type="button" onClick={handleSubmitButton}>
          Search
        </button>
      </div>

      <div>
        {checkForData && (!searchresults || searchresults.length === 0) ? (
          <p>No results found!</p>
        ) : searchresults && searchresults.length > 1 ? (
          <MultipleTiers multipleResults={searchresults} />
        ) : (
          searchresults &&
          searchresults.length === 1 && (
            <SingleTierDetails singleResult={searchresults} />
          )
        )}
      </div>
    </>
  );
}
