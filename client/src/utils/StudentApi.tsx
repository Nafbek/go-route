import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";
interface StudentApi {
  createStudent: (data: any) => Promise<string[]>;
  findSingleStudent: (studentFirstName: string) => Promise<string[] | null>;
  updateStudent: (data: string) => Promise<string | null>;
  deleteStudent: () => Promise<string | null>;
}

const StudentApi: StudentApi = {
  createStudent: async (data: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/student`, data, {
        headers: {
          "Content-Type": "application/json",
        },
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
  findSingleStudent: async (studentFirstName: string) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/student/${studentFirstName}`,
        {
          headers: { "Content-Type": "application/json" },
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
  updateStudent: async (data: string) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/student/id`, data, {
        headers: {
          "Content-Type": "application/json",
        },
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
  deleteStudent: async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/api/student/id`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response || response.status !== 200) {
        console.error(
          "Data requested for deletion not found. Please try again."
        );
        return null;
      }
      return response.data;
    } catch (error) {
      console.error("Server error occurec.");
      throw error;
    }
  },
};

export { StudentApi };
