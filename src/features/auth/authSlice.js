import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthentificated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthentificated = false;
      state.isLoading = false;
      state.error = null;
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUser, logoutUser, setAuthLoading, setAuthError } = authSlice.actions;

export default authSlice.reducer;
