import { useState } from "react";
import { useParams } from "react-router-dom";
import { StudentApi } from "../../utils/StudentApi";
import { StudentUI } from "./StudentUI";

export default function StudentDataFetcher() {
  const [searchResults, setSearchResults] = useState<any[] | null>();
  const [checkForData, setCheckForData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { studentFirstName } = useParams();
  const fetchSingleStudent = async () => {
    try {
      const response = await StudentApi.findSingleStudent(studentFirstName!);
      if (response) {
        setSearchResults(response ? [response] : null);
      } else {
        setSearchResults(null);
      }
    } catch (error) {
      console.error("Error occured while fetching student data.", error);
    }
  };

  const handleSearchInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButton = async (e: any) => {
    e.preventDefault();
    setSearchResults(null);
    setCheckForData(true);
    await fetchSingleStudent();
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={searchQuery}
          placeholder="search by first name"
          onChange={(e) => {
            handleSearchInputChange(e);
          }}
        />
      </div>
      <button type="button" onClick={handleSearchButton}>
        Search
      </button>
      {searchResults && searchResults.length > 0 ? (
        <StudentUI results={searchResults} />
      ) : (
        checkForData && !searchResults && <p>No results</p>
      )}
    </>
  );
}
