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
            <p>Driver First Name: {pkg.MainDriver?.driverFirstName}</p>
            <p>Driver Last Name: {pkg.MainDriver?.driverSecondName}</p>
            <p>Driver Contact Number: {pkg.MainDriver?.driverContactNumber}</p>
            <p>Disctrict Name: {pkg.districtName}</p>
            <p>Package Number: {pkg.packageNumber}</p>
            <p>Package Description: {pkg.packageDescription}</p>
            <h2>Tiers/routes: </h2>
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
                        <p>Dropoff time at school: {stop.dropoffTime_school}</p>
                        <p>Dropoff time at home: {stop.dropoffTime_home}</p>
                        <p>Pickup time from school: {stop.pickupTime_school}</p>
                        {stop.Students && stop.Students.length > 0 && (
                          <div>
                            <h2>Students: </h2>
                            {stop.Students.map((student: any) => (
                              <div key={student.id}>
                                <p>First Name: {student.studentFirstName}</p>
                                <p>Last Name: {student.studentLastName}</p>
                                <p>
                                  Student Contact Number:{" "}
                                  {student.studentContactNumber}
                                </p>
                                <p>Description: {student.studentDescription}</p>
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
      </div>
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
