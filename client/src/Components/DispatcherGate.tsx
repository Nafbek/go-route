import { Link } from "react-router-dom";
import MainDriver from "./MainDriver";
import Package from "./Package";
import Stop from "./Stop";
import Student from "./Student";
import Tier from "./Tier";
import { createContext, useContext, useState } from "react";

import { PackageApi } from "../utils/PackageAPI";
import { Dashboard } from "./Dashboard";

const searchContext = createContext({});

export function useSearchContext() {
  return useContext(searchContext);
}
export function DispatcherGate() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSearch = async () => {
    try {
      const response = await PackageApi.findSinglePackage();
      if (response !== null) {
        setSearchResults([response]);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error occured while fetching search results", error);
      throw error;
    }
  };

  return (
    <searchContext.Provider value={{ searchResults }}>
      <>
        <div>
          <label htmlFor="searchList">Search by:</label>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            id="searchOptions"
          >
            <option value="routeNumber">Route Number</option>
            <option value="packageNumber">Package Number</option>
            <option value="school">School/Centre name</option>
            <option value="driver name">Driver first name</option>
          </select>
          <input
            type="text"
            id="searchList"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="write your search input here"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {/* side bar here for:  */}
        <div>
          {/* <div>
          <Link to="/package/modify">Modify</Link>
        </div> */}
          <div>
            <Link to="/package">Create New Package</Link>
          </div>
          <div>
            <Link to="/package">Modify</Link>
          </div>
          <div>
            <Link to="/package">Remove</Link>
          </div>

          <div>
            <Link to="/dashboard">Go to Dashboard</Link>
          </div>
        </div>
        {searchResults && searchResults.length > 0 && (
          <div>
            {searchResults.map((result: string, index: number) => {
              return <div key={index}>{result}</div>;
            })}
          </div>
        )}
      </>
    </searchContext.Provider>
  );
}
