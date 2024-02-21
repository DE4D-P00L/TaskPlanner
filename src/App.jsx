import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useFetchTasks from "./hooks/useFetchTasks.js";
import { setProject } from "./features/projectSlice.js";

function App() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const darkmode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);
  const projectName = useSelector((state) => state.project.projectName) || "";
  const { pid } = useParams();
  const navigate = useNavigate();
  const { getTasks } = useFetchTasks();
  const dispatch = useDispatch();

  useEffect(() => {
    onPageLoad();
    dispatch(setProject(pid));
  }, [navigate, pid, user]);

  const onPageLoad = async () => {
    if (!user) navigate("/login", { replace: true });
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser.projects.includes(pid)) navigate("/");
    setLoading(true);
    setTasks(await getTasks(pid));
    setLoading(false);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="w-full min-h-[calc(100vh-70px)] h-fit flex flex-col items-center gap-5
       p-3"
        data-theme={`${darkmode ? "dark" : "light"}`}>
        <h2 className="text-2xl font-bold">{projectName}</h2>
        <CreateTask tasks={tasks} setTasks={setTasks} projectId={pid} />
        {!loading && <ListTasks tasks={tasks} setTasks={setTasks} />}
      </div>
    </DndProvider>
  );
}

export default App;
