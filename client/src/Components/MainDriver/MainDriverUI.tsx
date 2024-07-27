import React, { useEffect } from "react";

export function DriverUI({ results }: { results: any }) {
  return (
    <>
      <div>Driver's List</div>
      {results &&
        results.map((driver: any) => (
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
  useEffect(() => {
    console.log(driverDetails);
  }, [driverDetails]);

  return (
    <>
      <div>Single driver and all associated data </div>

      <div key={driverDetails.id}>
        <p>First Name: {driverDetails.driverFirstName}</p>
        <p>Last Name: {driverDetails.driverSecondName}</p>
        <p>driverContactNumber: {driverDetails.driverContactNumber}</p>
        <p>
          driverSecondContactNumber: {driverDetails.driverSecondContactNumber}
        </p>
        <h2>Package: </h2>
        {driverDetails.packages?.map((pkg: any) => (
          <div key={pkg.id}>
            <p>District Name: {pkg.districtName}</p>
            <p>Package Number: {pkg.packageNumber}</p>
            <p>Package Description: {pkg.packageDescription}</p>
            {pkg.tiers && pkg.tiers.length > 0 && (
              <div>
                <h2>tierss: </h2>
                {pkg.tiers?.map((tier: any) => (
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
                    {tier.stops && tier.stops.length > 0 && (
                      <div>
                        <h2>stops: </h2>
                        {tier.stops?.map((stop: any) => (
                          <div key={stop.id}>
                            <p>Stop Name: {stop.stopName}</p>
                            <p>Stop Address: {stop.stopAddress}</p>
                            <p>Pickup time from home: {stop.pickTime_home}</p>
                            <p>
                              Dropoff time at school: {stop.dropoffTime_school}
                            </p>
                            <p>Dropoff time at home: {stop.dropoffTime_home}</p>
                            <p>
                              Pickup time from school: {stop.pickupTime_school}
                            </p>
                            {stop.students && stop.students.length > 0 && (
                              <div>
                                <h2>students: </h2>
                                {stop.students?.map((student: any) => (
                                  <div key={student.id}>
                                    <p>
                                      First Name: {student.studentFirstName}
                                    </p>
                                    <p>Last Name: {student.studentLastName}</p>
                                    <p>
                                      Student Contact Number:{" "}
                                      {student.studentContactNumber}
                                    </p>
                                    <p>
                                      Description: {student.studentDescription}
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
    </>
  );
}
