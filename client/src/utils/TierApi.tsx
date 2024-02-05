import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";
interface TierApi {
  createTier: (data: any) => Promise<string>;
  findTierBySchool: () => Promise<string | null>;
  findTierByTime: () => Promise<string | null>;
  updateTier: (routeNumber: string) => Promise<string>;
  deleteRouteTier: () => Promise<string>;
}

const TierApi: TierApi = {
  createTier: async (data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/tier`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Server error occured.", error);
      throw error;
    }
  },

  findTierBySchool: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tier/school`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response || response.status !== 200) {
        console.error("Data requested not found. Please try again.");
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Server error occured while fetching data.", error);
      throw error;
    }
  },
  findTierByTime: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tier/timestart`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response || response.status !== 200) {
        console.error("Data requested not found. Please try again.");
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Server error occured.", error);
      throw error;
    }
  },

  updateTier: async (data: string) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/tier/routenumber`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response || response.status !== 200) {
        console.error("Data requested for update not found. Please try again.");
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Server error occured.", error);
      throw error;
    }
  },
  deleteRouteTier: async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/tier/routenumber`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response || response.status !== 200) {
        console.error("Something went wrong.");
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Server error occured.", error);
      throw error;
    }
  },
};

export { TierApi };
