import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    fitnessGoal: '',
    experienceLevel: '',
    preferredWorkoutDays: [],
    equipment: [],
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  setProfile,
} = userSlice.actions;

export default userSlice.reducer; 