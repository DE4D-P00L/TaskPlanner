import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    id: "",
    content: "",
    status: "todo",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.content.length < 3)
      return toast.error("Task must have more than 3 characters");
    setTasks((prev) => {
      const newList = [...prev, task];
      localStorage.setItem("tasks", JSON.stringify(newList));
      return newList;
    });
    setTask({
      id: "",
      content: "",
      status: "todo",
    });
    toast.success("Task added");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), content: e.target.value })
        }
        value={task.content}
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-2"
      />
      <button
        type="submit"
        className="bg-cyan-500 rounded-md px-4 h-12 text-white">
        +
      </button>
    </form>
  );
};

export default CreateTask;
