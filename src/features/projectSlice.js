import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectId: "",
  projectName: "",
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.projectId = action.payload;
    },
    setProjectName: (state, action) => {
      state.projectName = action.payload;
    },
    clearProject: (state) => {
      state.projectId = "";
    },
  },
});

export const { setProject, clearProject, setProjectName } =
  projectSlice.actions;

export default projectSlice.reducer;
