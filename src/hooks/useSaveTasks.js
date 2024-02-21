import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useSaveTasks = () => {
  const [loading, setLoading] = useState(true);

  const saveTasks = async (id, tasks) => {
    try {
      setLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/v1/project/" + id,
        { taskList: tasks },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      if (!response.data.success) return toast.error(response.data.message);
      toast.success("Project Saved");
    } catch (error) {
      console.log(error);
      toast.success("ERROR! Please try again");
    } finally {
      setLoading(false);
    }
  };

  return { loading, saveTasks };
};
export default useSaveTasks;
