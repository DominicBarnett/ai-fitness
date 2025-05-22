import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workouts: [],
  selectedWorkout: null,
  loading: false,
  error: null,
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    fetchWorkoutsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWorkoutsSuccess: (state, action) => {
      state.workouts = Array.isArray(action.payload) ? action.payload : [];
      state.loading = false;
      state.error = null;
    },
    fetchWorkoutsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.workouts = [];
    },
    selectWorkout: (state, action) => {
      state.selectedWorkout = action.payload;
    },
    clearSelectedWorkout: (state) => {
      state.selectedWorkout = null;
    },
  },
});

export const {
  fetchWorkoutsStart,
  fetchWorkoutsSuccess,
  fetchWorkoutsFailure,
  selectWorkout,
  clearSelectedWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer; 