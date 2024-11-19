import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Stores user info (e.g., name, email, picture)
    isAuthenticated: false, // Tracks authentication status
    error: null, // Tracks any authentication errors
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Set user info
      state.isAuthenticated = true; // Mark user as authenticated
      state.error = null; // Clear any previous errors
    },
    logout: (state) => {
      state.user = null; // Clear user info
      state.isAuthenticated = false; // Mark user as unauthenticated
      state.error = null; // Clear any errors
    },
    setError: (state, action) => {
      state.error = action.payload; // Set the error message
    },
  },
});

export const { login, logout, setError } = authSlice.actions;

export default authSlice.reducer;
