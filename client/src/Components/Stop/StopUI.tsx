export default function StopDisplay({ results }: { results: any }) {
  return (
    <>
      <div>Stop search results</div>
      {results.map((stop: any) => (
        <div key={stop.id}>
          <p>
            Driver First Name:{" "}
            {stop?.tiers?.packages?.MainDriver?.driverFirstName}
          </p>
          <p>
            Driver Last Name:{" "}
            {stop?.tiers?.packages?.MainDriver?.driverSecondName}
          </p>
          <p>
            Driver Contact Number:{" "}
            {stop?.tiers?.packages?.MainDriver?.driverContactNumber}
          </p>
          <p>Disctrict Name: {stop?.tiers?.Package?.districtName}</p>
          <p>Package Number: {stop?.tiers?.Package?.packageNumber}</p>
          <p>Package Description: {stop?.tiers?.Package?.packageDescription}</p>
          <h2>tiers/routes: </h2>
          <p>School Name: {stop?.tiers?.tiersAnchor_school}</p>
          <p>School Contact Number: {stop?.tiers?.schoolContactNumber}</p>
          <p>Route Number: {stop?.tiers?.routeNumber}</p>
          <p>Shift: {stop?.tiers?.shift}</p>
          <p>Time Start: {stop?.tiers?.timeStart}</p>
          <p>Time End: {stop?.tiers?.timeEnd}</p>
          <p>Running days: {stop?.tiers?.runningDays}</p>
          <p>Total Miles: {stop?.tiers?.totalMiles}</p>
          <p>Route Description: {stop?.tiers?.routeDescription}</p>
          <p>Stop Name: {stop.stopName}</p>
          <p>Stop Address: {stop.stopAddress}</p>
          <p>Pickup time from home: {stop.pickTime_home}</p>
          <p>Dropoff time at school: {stop.dropoffTime_school}</p>
          <p>Dropoff time at home: {stop.dropoffTime_home}</p>
          <p>Pickup time from school: {stop.pickupTime_school}</p>
          {stop.students && stop.students.length > 0 && (
            <div>
              <h2>students: </h2>
              {stop.students?.map((student: any) => (
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
