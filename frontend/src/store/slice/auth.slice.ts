import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for the user object
interface User {
  id: string;
  name: string;
  email: string;
  picture?: string; // Optional field for user profile picture
}

// Define the interface for the auth state
interface AuthState {
  user: User | null; // User object or null when not authenticated
  isAuthenticated: boolean; // Authentication status
  error: string | null; // Error message, if any
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // Set user info
      state.isAuthenticated = true; // Mark user as authenticated
      state.error = null; // Clear any previous errors
    },
    logout: (state) => {
      state.user = null; // Clear user info
      state.isAuthenticated = false; // Mark user as unauthenticated
      state.error = null; // Clear any errors
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload; // Set the error message
    },
  },
});

// Export actions
export const { login, logout, setError } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
