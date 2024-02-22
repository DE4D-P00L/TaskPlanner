import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchAllProjects from "../hooks/useFetchAllProjects.js";
import ProjectItem from "../components/ProjectItem.jsx";
import { clearProject } from "../features/projectSlice.js";

const Home = () => {
  const darkmode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);
  const { loading, fetchProjects, projects } = useFetchAllProjects();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
    dispatch(clearProject());
    fetchProjects();
  }, []);

  const refreshPage = () => {
    fetchProjects();
  };

  return (
    <div
      className="w-full h-fit min-h-[calc(100vh-70px)] flex p-3"
      data-theme={`${darkmode ? "dark" : "light"}`}>
      {projects?.length > 0 && (
        <div className=" mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {projects?.map((project) => (
              <ProjectItem
                key={project._id}
                project={project}
                refreshPage={refreshPage}
              />
            ))}
          </div>
        </div>
      )}
      {loading && (
        <div className=" mx-auto max-w-6xl grid place-content-center">
          <div className="text-center">LOADING...</div>
        </div>
      )}
      {!loading && projects?.length === 0 && (
        <div className=" mx-auto max-w-6xl grid place-content-center">
          <div className="text-center">
            Welcome, {user?.username + " "}click &quot;New Project&quot; to
            start a new Project
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
