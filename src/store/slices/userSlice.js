import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  weightUnit: 'kg', // 'kg' or 'lbs'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWeightUnit: (state, action) => {
      state.weightUnit = action.payload;
    },
    toggleWeightUnit: (state) => {
      state.weightUnit = state.weightUnit === 'kg' ? 'lbs' : 'kg';
    },
  },
});

export const { setUser, clearUser, setLoading, setWeightUnit, toggleWeightUnit } = userSlice.actions;
export default userSlice.reducer;
