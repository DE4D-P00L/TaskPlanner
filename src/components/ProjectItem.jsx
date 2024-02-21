import { useNavigate } from "react-router-dom";
import convertTimeString from "../utils/timeToString";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import randomRGBColor from "../utils/randomColorGenerator.js";
import ProjectDeletionDialog from "./ProjectDeletionDialog.jsx";
import { useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProjectName } from "../features/projectSlice.js";

const ProjectItem = ({ project, refreshPage }) => {
  const { projectName, _id, taskList, updatedAt } = project;
  const dt = convertTimeString(updatedAt).split("at");
  const navigate = useNavigate();
  const randomColor = randomRGBColor();
  const tailwindColor = randomColor;
  const ref = useRef(null);
  const dispatch = useDispatch();
  const toggleDialog = () => {
    if (!ref.current) return;
    if (ref.current.hasAttribute("open")) {
      ref.current.close();
    } else {
      ref.current.showModal();
    }
  };

  const projectSelectHandler = () => {
    dispatch(setProjectName(projectName));
    navigate("/project/" + _id);
  };

  const deleteHandler = async () => {
    console.log(_id);
    const response = await axios.delete(
      import.meta.env.VITE_SERVER_URL + `/api/v1/project/${_id}`,
      { headers: { Authorization: localStorage.getItem("token") } }
    );
    if (response.data.success) {
      refreshPage();
      toggleDialog();
      navigate("/");
    }
  };

  return (
    <div className="relative">
      <div
        className={`border border-primary-content rounded-md p-4 flex flex-col justify-between select-none cursor-pointer h-[140px] ${tailwindColor} text-black  w-[190px]`}
        onClick={projectSelectHandler}>
        <h3 className="font-bold text-2xl text-wrap break-words">
          {projectName}
        </h3>
        <span className="text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaSave className="text-2xl" />
            <div className="flex flex-col leading-3">
              <span className="text-[12px]">{dt[0]}</span>
              <span className="text-[11px]">{dt[1]}</span>
            </div>
          </div>
        </span>
      </div>
      <button
        className="z-7 absolute bottom-4 right-4 p-1"
        onClick={toggleDialog}>
        <FaTrashAlt className="text-2xl text-red-800" />
      </button>
      <ProjectDeletionDialog
        ref={ref}
        toggleDialog={toggleDialog}
        deleteHandler={deleteHandler}
        projectName={projectName}
        id={_id}>
        Are you sure you want to delete{" "}
        <span className="font-bold">{projectName}</span>? This action cannot be
        reversed.
      </ProjectDeletionDialog>
    </div>
  );
};
export default ProjectItem;
