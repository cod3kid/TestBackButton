import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'dark', // 'light' or 'dark'
  primaryColor: '#815dec',
  fontSize: 'medium', // 'small', 'medium', 'large'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    resetTheme: (state) => {
      state.theme = 'light';
      state.primaryColor = '#815dec';
      state.fontSize = 'medium';
    },
  },
});

export const { setTheme, setPrimaryColor, setFontSize, toggleTheme, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
