import React from "react";

export function DriverUI({ results }: { results: any }) {
  return (
    <>
      <div>Driver's List</div>
      {results.map((driver: any) => (
        <div key={driver.id}>
          <p>First Name: {driver.driverFirstName}</p>
          <p>Last Name: {driver.driverSecondName}</p>
          <p>driverContactNumber: {driver.driverContactNumber}</p>
          <p>driverSecondContactNumber: {driver.driverSecondContactNumber}</p>
        </div>
      ))}
    </>
  );
}
export function SingleDriverDetails({ driverDetails }: { driverDetails: any }) {
  if (!driverDetails || !Array.isArray(driverDetails)) {
    return <p>No Driver details found.</p>;
  }
  return (
    <>
      <div>Single driver and all associated data </div>
      {driverDetails.map((driver: any) => (
        <div key={driver.id}>
          <p>First Name: {driver.driverFirstName}</p>
          <p>Last Name: {driver.driverSecondName}</p>
          <p>driverContactNumber: {driver.driverContactNumber}</p>
          <p>driverSecondContactNumber: {driver.driverSecondContactNumber}</p>
          <h2>Packages: </h2>
          {driver.Packages?.map((pkg: any) => (
            <div key={pkg.id}>
              <p>District Name: {pkg.districtName}</p>
              <p>Package Number: {pkg.packageNumber}</p>
              <p>Package Description: {pkg.packageDescription}</p>
              {pkg.Tiers && pkg.Tiers.length > 0 && (
                <div>
                  <h2>Tiers: </h2>
                  {pkg.Tiers?.map((tier: any) => (
                    <div key={tier.id}>
                      <p>School Name: {tier.tierAnchor_school}</p>
                      <p>School Contact Number: {tier.schoolContactNumber}</p>
                      <p>Route Number: {tier.routeNumber}</p>
                      <p>Shift: {tier.shift}</p>
                      <p>Time Start: {tier.timeStart}</p>
                      <p>Time End: {tier.timeEnd}</p>
                      <p>Running days: {tier.runningDays}</p>
                      <p>Total Miles: {tier.totalMiles}</p>
                      <p>Route Description: {tier.routeDescription}</p>
                      {tier.Stops && tier.Stops.length > 0 && (
                        <div>
                          <h2>Stops: </h2>
                          {tier.Stops?.map((stop: any) => (
                            <div key={stop.id}>
                              <p>Stop Name: {stop.stopName}</p>
                              <p>Stop Address: {stop.stopAddress}</p>
                              <p>Pickup time from home: {stop.pickTime_home}</p>
                              <p>
                                Dropoff time at school:{" "}
                                {stop.dropoffTime_school}
                              </p>
                              <p>
                                Dropoff time at home: {stop.dropoffTime_home}
                              </p>
                              <p>
                                Pickup time from school:{" "}
                                {stop.pickupTime_school}
                              </p>
                              {stop.Students && stop.Students.length > 0 && (
                                <div>
                                  <h2>Students: </h2>
                                  {stop.Students?.map((student: any) => (
                                    <div key={student.id}>
                                      <p>
                                        First Name: {student.studentFirstName}
                                      </p>
                                      <p>
                                        Last Name: {student.studentLastName}
                                      </p>
                                      <p>
                                        Student Contact Number:{" "}
                                        {student.studentContactNumber}
                                      </p>
                                      <p>
                                        Description:{" "}
                                        {student.studentDescription}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
