import axios, { AxiosError, AxiosResponse } from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface MainDriverApi {
  createMainDriver: (data: any) => Promise<string>;
  getAllMainDriver: () => Promise<string[] | null>;
  getAllDriverBySchool: () => Promise<string[] | null>;
  getSingleDriver: () => Promise<string | null>;
  getOnlySingleDriverProfile: () => Promise<string | null>;
  updateDriver: (data: any) => Promise<string>;
}

const MainDriverApi: MainDriverApi = {
  createMainDriver: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/driver`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Server error occured", error);
      throw error;
    }
  },

  getAllMainDriver: async () => {
    try {
      const response: AxiosResponse<string[]> = await axios.get(
        `${API_BASE_URL}/driver/`,
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

  getSingleDriver: async () => {
    try {
      const response: AxiosResponse<string> = await axios.get(
        `${API_BASE_URL}/driver/driverFirstName`,
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

  getOnlySingleDriverProfile: async () => {
    try {
      const response: AxiosResponse<string> = await axios.get(
        `${API_BASE_URL}/driver/profile`,
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
  getAllDriverBySchool: async () => {
    try {
      const response: AxiosResponse<string[]> = await axios.get(
        `${API_BASE_URL}/driver/tierAnchor_school`,
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

  updateDriver: async (data:any) => {
    try {
      const response: AxiosResponse<string> = await axios.put(
        `${API_BASE_URL}/driver/driverFirstName`,
        data,
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
};

export { MainDriverApi };
