interface TierApi {
  createTier: (data: any) => Promise<string>;
  findTierBySchool: () => Promise<string | null>;
  findTierByTime: () => Promise<string | null>;
  updateTier: (routeNumber: string) => Promise<string>;
  deleteRouteTier: (routeNumber: string) => Promise<string>;
}

// const TierApi: TierApi ={

// }
