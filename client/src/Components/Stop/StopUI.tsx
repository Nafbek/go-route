export default function StopDisplay({ results }: { results: any }) {
  return (
    <>
      <div>Stop search results</div>
      {results.map((stop: any) => (
        <div key={stop.id}>
          <p>
            Driver First Name:{" "}
            {stop?.Tiers?.Packages?.MainDriver?.driverFirstName}
          </p>
          <p>
            Driver Last Name:{" "}
            {stop?.Tiers?.Packages?.MainDriver?.driverSecondName}
          </p>
          <p>
            Driver Contact Number:{" "}
            {stop?.Tiers?.Packages?.MainDriver?.driverContactNumber}
          </p>
          <p>Disctrict Name: {stop?.Tiers?.Packages?.districtName}</p>
          <p>Package Number: {stop?.Tiers?.Packages?.packageNumber}</p>
          <p>
            Package Description: {stop?.Tiers?.Packages?.packageDescription}
          </p>
          <h2>Tiers/routes: </h2>
          <p>School Name: {stop?.Tiers?.tierAnchor_school}</p>
          <p>School Contact Number: {stop?.Tiers?.schoolContactNumber}</p>
          <p>Route Number: {stop?.Tiers?.routeNumber}</p>
          <p>Shift: {stop?.Tiers?.shift}</p>
          <p>Time Start: {stop?.Tiers?.timeStart}</p>
          <p>Time End: {stop?.Tiers?.timeEnd}</p>
          <p>Running days: {stop?.Tiers?.runningDays}</p>
          <p>Total Miles: {stop?.Tiers?.totalMiles}</p>
          <p>Route Description: {stop?.Tiers?.routeDescription}</p>
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
                  <p>Student Contact Number: {student.studentContactNumber}</p>
                  <p>Description: {student.studentDescription}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
