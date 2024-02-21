/* eslint-disable react/prop-types */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { FaSave } from "react-icons/fa";
import useSaveTasks from "../hooks/useSaveTasks";

const CreateTask = ({ tasks, setTasks, projectId }) => {
  const [task, setTask] = useState({
    id: "",
    content: "",
    status: "todo",
  });
  const { saveTasks } = useSaveTasks();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.content.length < 3)
      return toast.error("Task must have more than 3 characters");

    setTasks([...tasks, task]);
    setTask({
      id: "",
      content: "",
      status: "todo",
    });
    toast.success("Task added");
  };

  const saveHandler = async () => {
    await saveTasks(projectId, tasks);
  };

  return (
    <div className="sm:w-full">
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
        <div className="flex gap-3 w-full sm:max-w-[110px]">
          <button
            type="submit"
            className="bg-secondary rounded-md px-4 h-12 text-white select-none max-w-64 flex-1">
            +
          </button>
          <div
            onClick={saveHandler}
            className="bg-info rounded-md px-4 h-12 text-white select-none max-w-64 w-fit flex justify-center items-center flex-1">
            <FaSave />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
