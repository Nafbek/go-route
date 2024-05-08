import { useEffect, useState } from "react";
import { PackageApi } from "../../utils/PackageAPI";
import { PackageList } from "./PackageUI";
import { useParams } from "react-router-dom";
import { SinglePackageDetails } from "./PackageUI";

export default function PackageDataFetcher() {
  const [searchResults, setSearchResults] = useState<any[] | null>();
  const [searchQuery, setSearchQuery] = useState("");
  const [checkForData, setCheckForData] = useState(false);

  const { packageNumber, districtName } = useParams();

  const fetchData = async () => {
    try {
      if (searchQuery.trim()) {
        const response = await PackageApi.findSinglePackage(searchQuery);
        console.log("this is my package info", response);
        setSearchResults(response ? [response] : []);
      } else {
        setSearchResults(null);
      }
    } catch (error) {
      console.error("Error occured while fetching package data", error);
    }
  };

  const fetchAllPackages = async () => {
    try {
      const response = await PackageApi.findAllPackage();

      console.log("this is all list of packages", response);
      setSearchResults(response);
    } catch (error) {
      console.error("Error occured while fetching all packages.", error);
    }
  };

  const handleSearchInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  // useEffect(() => {
  //   fetchData();
  // }, [searchQuery]);

  const handleSearchButton = async (e: any) => {
    e.preventDefault();
    setSearchResults(null);
    setCheckForData(true);
    await fetchData();
  };

  const handleListOfPackages = async (e: any) => {
    e.preventDefault();
    await fetchAllPackages();
    console.log("button clicked");
  };

  return (
    <>
      <div>Package</div>
      <input
        type="text"
        value={searchQuery}
        placeholder="search by package number"
        onChange={(e) => {
          handleSearchInputChange(e);
        }}
      />
      <button type="button" onClick={handleSearchButton}>
        Search
      </button>
      <div>
        <button type="button" onClick={handleListOfPackages}>
          Search All Packages
        </button>
      </div>

      <div>
        {checkForData && (!searchResults || searchResults.length === 0) && (
          <p>No results found</p>
        )}
        {searchResults && searchResults.length > 0 ? (
          <PackageList results={searchResults} />
        ) : (
          searchResults && <SinglePackageDetails details={searchResults} />
        )}
      </div>
    </>
  );
}
