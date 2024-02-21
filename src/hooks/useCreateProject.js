import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useCreateProject = () => {
  const [loading, setLoading] = useState(true);

  const createProject = async (projectName) => {
    try {
      setLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/v1/project/",
        projectName,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      if (!response.data.success) return toast.error(response.data.message);
      toast.success("Project Created Successfully");
      return response.data?.project?._id;
    } catch (error) {
      console.log(error);
      toast.error("Please try again");
    } finally {
      setLoading(false);
    }
  };

  return { loading, createProject };
};
export default useCreateProject;
