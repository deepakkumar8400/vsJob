// src/redux/jobSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  job: null, // Add this to store single job details
  isLoading: false,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.allJobs = action.payload;
      state.isLoading = false;
    },
    setJob: (state, action) => {
      state.job = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { setJobs, setJob, setLoading } = jobSlice.actions;

export default jobSlice.reducer;