export function MultipleTiers({ multipleResults }: { multipleResults: any }) {
  return (
    <>
      <div>
        <h2>Multiple Tiers search results</h2>
        {multipleResults.map((tier: any) => (
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
          </div>
        ))}
      </div>
    </>
  );
}

export function SingleTierDetails({ singleResult }: { singleResult: any }) {
  return (
    <>
      <div>
        <h1>Single Tier search result</h1>
        {singleResult.map((singleTier: any) => (
          <div key={singleTier.id}>
            <p>
              Driver First Name:{" "}
              {singleTier.Packages?.MainDriver?.driverFirstName}
            </p>
            <p>
              Driver Last Name:{" "}
              {singleTier.Packages?.MainDriver?.driverSecondName}
            </p>
            <p>
              Driver Contact Number:{" "}
              {singleTier.Packages?.MainDriver?.driverContactNumber}
            </p>
            <p>Disctrict Name: {singleTier.Packages?.districtName}</p>
            <p>Package Number: {singleTier.Packages?.packageNumber}</p>
            <p>
              Package Description: {singleTier.Packages?.packageDescription}
            </p>
            <h2>Tiers/routes: </h2>
            <p>School Name: {singleTier.tierAnchor_school}</p>
            <p>School Contact Number: {singleTier.schoolContactNumber}</p>
            <p>Route Number: {singleTier.routeNumber}</p>
            <p>Shift: {singleTier.shift}</p>
            <p>Time Start: {singleTier.timeStart}</p>
            <p>Time End: {singleTier.timeEnd}</p>
            <p>Running days: {singleTier.runningDays}</p>
            <p>Total Miles: {singleTier.totalMiles}</p>
            <p>Route Description: {singleTier.routeDescription}</p>
            {singleTier.Stops && singleTier.Stops.length > 0 && (
              <div>
                <h2>Stops: </h2>
                {singleTier.Stops?.map((stop: any) => (
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
                        {stop.Students?.map((student: any) => (
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
    </>
  );
}
