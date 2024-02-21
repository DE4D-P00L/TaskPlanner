import { forwardRef } from "react";
import { IoClose } from "react-icons/io5";

const ProjectDeletionDialog = forwardRef(
  ({ children, toggleDialog, projectName, deleteHandler }, ref) => {
    //   const dispatch = useDispatch();
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
              <h3 className="text-xl">Delete {projectName}?</h3>
              <button onClick={toggleDialog}>
                <IoClose />
              </button>
            </div>
            <div>
              {children}
              <div className="mt-2 flex gap-3">
                <button
                  className="bg-red-500 text-white px-2 py-1.5 rounded-md"
                  onClick={deleteHandler}>
                  Delete
                </button>
                <button
                  className="bg-secondary text-white px-2 py-1.5 rounded-md"
                  onClick={toggleDialog}>
                  Cancle
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    );
  }
);

ProjectDeletionDialog.displayName = "ProjectDeletionDialog";

export default ProjectDeletionDialog;
