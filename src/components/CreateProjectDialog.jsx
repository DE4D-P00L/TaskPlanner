/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import useCreateProject from "../hooks/useCreateProject";
import { useNavigate } from "react-router-dom";
import { addProject } from "../features/authSlice";
import { useDispatch } from "react-redux";

const CreateProjectDialog = forwardRef(({ toggleDialog }, ref) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createProject } = useCreateProject();

  const onSubmit = async (data) => {
    const pid = await createProject(data);
    console.log(pid);
    resetField("projectName");
    dispatch(addProject(pid));
    navigate("/project/" + pid);
    ref.current.close();
  };

  return (
    <div>
      <dialog
        className="w-full p-3 max-w-sm rounded-lg"
        ref={ref}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            toggleDialog();
          }
        }}>
        <div className="space-y-5">
          <div className="flex justify-between">
            <h3 className="text-xl">Create a new project</h3>
            <button onClick={toggleDialog}>
              <IoClose />
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Project Name"
              className="flex-1 border border-slate-500 bg-transparent px-3 py-1.5 rounded-md"
              {...register("projectName", {
                required: "Project name required!",
                maxLength: 18,
              })}
            />
            {errors.projectName && console.log(errors)}
            <button
              type="submit"
              className="bg-primary px-2 py-1 rounded-md text-white">
              Create
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
});

CreateProjectDialog.displayName = "CreateProjectDialog";

export default CreateProjectDialog;
