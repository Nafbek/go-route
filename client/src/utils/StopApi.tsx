import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";
interface StopApi {
  createStop: (data: any) => Promise<any[]>;
  findStop: (stopAddress: any) => Promise<any[] | null>;
  updateStop: (data: string) => Promise<string | null>;
  deleteStop: () => Promise<string>;
}

const StopApi: StopApi = {
  createStop: async (data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/stop`, data, {
        headers: { "Content-Type": "application/json" },
      });
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

  findStop: async (stopAddress: any) => {
    try {
      const encodedStopAddress = encodeURIComponent(stopAddress);
      const response = await axios.get(
        `${API_BASE_URL}/api/stop/${encodedStopAddress}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response || response.status !== 200) {
        console.error("Data requseted not found. Please try again.");
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Server error occured.", error);
      throw error;
    }
  },

  updateStop: async (data: any) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/stop/id`, data, {
        headers: { "Content-Type": "application/json" },
      });
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

  deleteStop: async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/stop/id`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response || response.status !== 200) {
        console.error("Data requested for deletion not found.");
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Server error occured.", error);
      throw error;
    }
  },
};

export { StopApi };
