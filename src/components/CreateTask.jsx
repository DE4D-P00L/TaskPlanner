/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const CreateTask = ({ setTasks }) => {
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
    <form
      onSubmit={handleSubmit}
      className="flex w-full justify-center sm:flex-row flex-col items-center gap-4">
      <input
        type="text"
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), content: e.target.value })
        }
        value={task.content}
        className="border-2 border-slate-400 bg-base-200 rounded-md h-12 px-2 max-w-64 w-full"
      />
      <button
        type="submit"
        className="bg-secondary rounded-md px-4 h-12 text-white select-none max-w-64 w-full sm:w-fit">
        +
      </button>
    </form>
  );
};

export default CreateTask;
