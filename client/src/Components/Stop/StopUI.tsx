export default function StopDisplay({ results }: { results: any }) {
  return (
    <>
      <div>Stop search results</div>
      {results.map((stopResult: any) => (
        <div key={stopResult.id}>
          <p>Stop Name: {stopResult.stopName}</p>
          <p>Stop Address: {stopResult.stopAddress}</p>
          <p>Pickup time from home: {stopResult.pickTime_home}</p>
          <p>Dropoff time at school: {stopResult.dropoffTime_school}</p>
          <p>Dropoff time at home: {stopResult.dropoffTime_home}</p>
          <p>Pickup time from school: {stopResult.pickupTime_school}</p>
        </div>
      ))}
    </>
  );
}
