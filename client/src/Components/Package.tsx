import { useState } from "react";
import { PackageApi } from "../utils/PackageAPI";
import Tier from "./Tier";
import Stop from "./Stop";
import Student from "./Student";
import MainDriver from "./MainDriver";
import { useSearchContext } from "./DispatcherGate";

export default function Package() {
  // const { searchResults } = useSearchContext();

  const [packageInfo, setPackageInfo] = useState({
    districtName: "",
    packageNumber: "",
    packageDescription: "",
  });
  const [infoSavingStatus, setInfoSavingStatus] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setPackageInfo({ ...packageInfo, [name]: value });
  };

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

    try {
      const response = await PackageApi.createPackageInfo({ ...packageInfo });
      if (!response) {
        console.log("Error occured while saving package information.");
      } else {
        setPackageInfo({
          districtName: "",
          packageNumber: "",
          packageDescription: "",
        });
        setInfoSavingStatus("Package info saved.");
      }
    } catch (error) {
      console.log("Server error occured while creating package");
      setInfoSavingStatus("Server error occured while saving package info.");
    }
  };
  return (
    <>
      <div>
        <MainDriver />
      </div>
      <div>
        <h2>Package Info</h2>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="districtName">Name of District</label>
            <input
              type="text"
              id="districtName"
              name="districtName"
              placeholder="District Name"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="packageNumber">Package Number</label>
            <input
              type="text"
              id="packageNumber"
              name="packageNumber"
              placeholder="Package Number"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="packageDescription">Package Description</label>
            <textarea
              name="packageDescription"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button>Save</button>
        </form>
        {infoSavingStatus && <p>{infoSavingStatus}</p>}
      </div>

      <Tier />
      <Stop />
      <Student />
    </>
  );
}
