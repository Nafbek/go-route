import axios, { AxiosError, AxiosResponse } from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

// Define the interface for MainDriverApi
interface MainDriverApi {
  createMainDriver: (data: any) => Promise<any[]>;
  findAllDrivers: () => Promise<any[] | null>;
  findAllDriversBySchool: (tierAnchor_school: string) => Promise<any[] | null>;
  findSingleMainDriver: (driverFirstName: string) => Promise<string | null>;
  findOnlySingleDriverProfile: (
    driverFirstName: string
  ) => Promise<string | null>;
  updateDriver: (data: any) => Promise<string[] | null>;
  deleteSingleDriver: (driverName: string) => Promise<string>;
}
// Implementation of MainDriverApi
const MainDriverApi: MainDriverApi = {
  // Create a main driver
  createMainDriver: async (data: any): Promise<any[]> => {
    console.log(data);
    try {
      console.log("Req. url", `${API_BASE_URL}/api/driver`);
      const response = await axios.post(`${API_BASE_URL}/api/driver`, data, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data.passcode;
    } catch (error) {
      console.error("Server error occured", error);
      throw error;
    }
  },
  // Find all drivers
  findAllDrivers: async () => {
    try {
      const response: AxiosResponse<any[]> = await axios.get(
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
  findSingleMainDriver: async (driverFirstName: string) => {
    try {
      const response: AxiosResponse<string> = await axios.get(
        `${API_BASE_URL}/api/driver/details/${driverFirstName}`,
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

  findOnlySingleDriverProfile: async (driverFirstName: string) => {
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
  findAllDriversBySchool: async (tierAnchor_school: string) => {
    try {
      const response: AxiosResponse<any[]> = await axios.get(
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
      const response: AxiosResponse<string[]> = await axios.put(
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

  deleteSingleDriver: async (driverFirstName: string) => {
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
