import axios, { AxiosError, AxiosResponse } from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

// Define the interface for MainDriverApi
interface MainDriverApi {
  createMainDriver: (data: any) => Promise<string>;
  getAllMainDriver: () => Promise<string[] | null>;
  getAllDriverBySchool: (tierAnchor_school: string) => Promise<string[] | null>;
  getSingleDriver: (driverFirstName: string) => Promise<string | null>;
  getOnlySingleDriverProfile: (
    driverFirstName: string
  ) => Promise<string | null>;
  updateDriver: (data: any) => Promise<string | null>;
  deleteDriver: (driverName: string) => Promise<string>;
}
// Implementation of MainDriverApi
const MainDriverApi: MainDriverApi = {
  // Create a main driver
  createMainDriver: async (data: any): Promise<string> => {
    console.log(data);
    try {
      console.log("Req. url", `${API_BASE_URL}/api/driver`);
      const response = await axios.post(`${API_BASE_URL}/api/driver`, data, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data.passcode as string;
    } catch (error) {
      console.error("Server error occured", error);
      throw error;
    }
  },
  // Find all drivers
  getAllMainDriver: async () => {
    try {
      const response: AxiosResponse<string[]> = await axios.get(
        `${API_BASE_URL}/api/driver/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
  // Find a single driver
  getSingleDriver: async (driverFirstName: string) => {
    try {
      const response: AxiosResponse<string> = await axios.get(
        `${API_BASE_URL}/api/driver/details${driverFirstName}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  getOnlySingleDriverProfile: async (driverFirstName: string) => {
    try {
      const response: AxiosResponse<string> = await axios.get(
        `${API_BASE_URL}/api/driver/profile/${driverFirstName}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
  getAllDriverBySchool: async (tierAnchor_school: string) => {
    try {
      const response: AxiosResponse<string[]> = await axios.get(
        `${API_BASE_URL}/api/driver/${tierAnchor_school}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  updateDriver: async (data: any) => {
    try {
      const response: AxiosResponse<string> = await axios.put(
        `${API_BASE_URL}/api/driver/driverFirstName`,
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

  deleteDriver: async (driverFirstName: string) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/driver/${driverFirstName}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response || response.status !== 200) {
        console.error("Unable to delete driver's data. Please try again.");
        throw new Error("Delete request failed.");
      }
      return "Driver's Data successfully deleted.";
    } catch (error) {
      console.error("Server error occured.", error);
      throw error;
    }
  },
};

export { MainDriverApi };
