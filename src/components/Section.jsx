/* eslint-disable react/prop-types */
import { useDrop } from "react-dnd";
import Header from "./Header";
import Task from "./Task";
import toast from "react-hot-toast";

function Section({ status, tasks, setTasks, todos, inProgress, done }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id, item.status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = (id, s) => {
    if (s === status) return;
    setTasks((prev) => {
      const mTasks = prev.map((task) => {
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(mTasks));
      toast.success("Task status changed");
      return mTasks;
    });
  };

  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }

  if (status === "done") {
    text = "Done";
    bg = "bg-green-500";
    tasksToMap = done;
  }

  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 ${
        isOver ? "bg-primary" : "bg-neutral"
      } border border-primary-content`}>
      <Header text={text} bg={bg} count={tasksToMap?.length} />
      <div className="pt-2 overflow-y-auto max-h-[calc(100vh-170px)] no-scrollbar flex flex-col gap-2 min-h-[50px]">
        {tasksToMap.length > 0 &&
          tasksToMap.map((task) => (
            <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
          ))}
      </div>
    </div>
  );
}

export default Section;
