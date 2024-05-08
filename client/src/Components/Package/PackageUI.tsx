import MainDriverFetchData from "../MainDriver/MainDriverDataFetcher";
import Stop from "../Stop/StopForm";
import Student from "../Student/StudentForm";
import Tier from "../Tier/TierForm";

export function SinglePackageDetails({ details }: { details: any }) {
  return (
    <>
      <div>
        <h1>Package search results</h1>
        {details.map((pkg: any) => (
          <div key={pkg.id}>
            <p>Disctrict Name: {pkg.districtName}</p>
            <p>Package Number: {pkg.packageNumber}</p>
            <p>Package Description: {pkg.packageDescription}</p>
          </div>
        ))}
      </div>
      {/* <MainDriverFetchData />
      <Tier />
      <Stop />
      <Student /> */}
    </>
  );
}

export function PackageList({ results }: { results: any }) {
  return (
    <>
      <div>
        <h3>All Packages List</h3>
        {results.map((pkg: any) => (
          <div key={pkg.id}>
            {/* <p>Disctrict Name: {pkg.districtName}</p> */}
            <p>Package Number: {pkg.packageNumber}</p>
            <p>Package Description: {pkg.packageDescription}</p>
          </div>
        ))}
      </div>
    </>
  );
}
