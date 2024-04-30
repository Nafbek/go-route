import React from "react";

export function DriverUI({ results }: { results: any }) {
  return (
    <>
      <div>Driver's List</div>
      {results.map((driver: any) => (
        <div key={driver.id}>
          <p>First Name: {driver.driverFirstName}</p>
          <p>Last Name: {driver.getFullName}</p>
          <p>driverContactNumber: {driver.driverContactNumber}</p>
          <p>driverSecondContactNumber: {driver.driverSecondContactNumber}</p>
        </div>
      ))}
    </>
  );
}
export function SingleDriverDetails(driverDetails: any) {
  return (
    <>
      <div>Single driver and all associated data </div>

      {/* <p>package: {driverDetails.}</p> */}
    </>
  );
}
