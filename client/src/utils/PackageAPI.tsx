import axios, { AxiosResponse } from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

interface PackageApi {
  createPackageInfo: (data: any) => Promise<any[]>;

  findSinglePackage: (packageNumber: string) => Promise<string | null>;
  findAllPackage: () => Promise<any[] | null>;
  updatePackage: (data: any) => Promise<string | null>;
  deleteSinglePackage: (packageNumber: string) => Promise<string | null>;
}

const PackageApi: PackageApi = {
  createPackageInfo: async (data: any) => {
    console.log("This is saved package info", data);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/package`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Server error occured", error);
      throw error;
    }
  },

  findSinglePackage: async (packageNumber: string) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/package/${packageNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("This is saved package info", response);
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

  findAllPackage: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/package`, {
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

  updatePackage: async (data: any) => {
    try {
      const response: AxiosResponse<string> = await axios.put(
        `${API_BASE_URL}/api/package/packageNumber`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response || response.status !== 200) {
        console.error("Data requested for updated not available.");
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Server error occured.", error);
      throw error;
    }
  },

  deleteSinglePackage: async (packageNumber: string) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/package/${packageNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response || response.status !== 200) {
        console.error("Unable to delete requested data.");
        return null;
      }
      return "Data successfully deleted.";
    } catch (error) {
      console.error("Server error occured.", error);
      throw error;
    }
  },
};

export { PackageApi };
