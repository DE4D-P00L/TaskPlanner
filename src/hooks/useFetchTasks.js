import axios from "axios";
import { useState } from "react";

const useFetchTasks = () => {
  const [loading, setLoading] = useState(true);

  const getTasks = async (pid) => {
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/api/v1/project/" + pid,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      return response.data?.project?.taskList;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getTasks };
};
export default useFetchTasks;
