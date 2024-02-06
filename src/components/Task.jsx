import { useDrag } from "react-dnd";
import toast from "react-hot-toast";

function Task({ task, tasks, setTasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    const fTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast.success("Task removed");
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 bg-slate-100 shadow-md rounded-md ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}>
      <p className="select-none text-md">{task.content}</p>
      <button
        className="absolute top-4 right-1 text-slate-500"
        onClick={() => handleRemove(task.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
}

export default Task;
