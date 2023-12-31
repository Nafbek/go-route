import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export interface MainDriverApi {
  createMainDriver: (data:any) => Promise<string>;
  getAllMainDriver: (data: any)=>Promise<string>
}

const MainDriverApi: MainDriverApi = {
  createMainDriver: async (data) => {
    try {
      const response = await axios
        .post(`${API_BASE_URL}/driver`, data, {
          headers: { "Content-Type": "application/json" },
          // data: JSON.stringify(data)
        })
       return response.data;
      // return response.data
    } catch (error) {
      console.error("Server error occured", error);
      throw error
    }
  },

getAllMainDriver:async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/driver/`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(!response){
 return res.status(400).json({message: "Data requested not found. Please try again."})
        }
        return response.data
    } catch( error) {
        console.error("Server error occured.", error)
        throw error
    }
}




};
