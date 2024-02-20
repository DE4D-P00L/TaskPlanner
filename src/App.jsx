import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";

function App() {
  const [tasks, setTasks] = useState([]);
  const darkmode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const list = localStorage.getItem("tasks");
    if (list && list.length > 0) setTasks(JSON.parse(list));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="w-full h-[calc(100vh-70px)] max-h-screen flex flex-col items-center gap-10
       p-3"
        data-theme={`${darkmode ? "dark" : "light"}`}>
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
