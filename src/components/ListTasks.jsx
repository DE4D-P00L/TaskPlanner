import { useEffect, useState } from "react";
import Section from "./Section";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fDone = tasks.filter((task) => task.status === "done");

    setTodos(fTodos);
    setInProgress(fInProgress);
    setDone(fDone);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "done"];

  return (
    <div className="flex gap-16 md:flex-row flex-col">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          done={done}
        />
      ))}
    </div>
  );
};

export default ListTasks;
