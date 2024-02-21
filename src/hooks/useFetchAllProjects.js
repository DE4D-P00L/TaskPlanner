import axios from "axios";
import { useState } from "react";

const useFetchAllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/api/v1/project/",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setProjects(response?.data?.projects?.projects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchProjects, projects };
};
export default useFetchAllProjects;
