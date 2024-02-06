import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const list = localStorage.getItem("tasks");
    if (list && list.length > 0) setTasks(JSON.parse(list));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster position="top-right" duration={500} />
      <div
        className="bg-slate-100 w-full h-screen max-h-screen flex flex-col items-center gap-10
       p-3">
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
