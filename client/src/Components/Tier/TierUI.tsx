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

export function SingleTierDetails({ singleTier }: { singleTier: any }) {
  return (
    <>
      <div>Single Tier search result</div>
      <div>
        <p>School Name: {singleTier.tierAnchor_school}</p>
        <p>School Contact Number: {singleTier.schoolContactNumber}</p>
        <p>Route Number: {singleTier.routeNumber}</p>
        <p>Shift: {singleTier.shift}</p>
        <p>Time Start: {singleTier.timeStart}</p>
        <p>Time End: {singleTier.timeEnd}</p>
        <p>Running days: {singleTier.runningDays}</p>
        <p>Total Miles: {singleTier.totalMiles}</p>
        <p>Route Description: {singleTier.routeDescription}</p>
      </div>
    </>
  );
}
