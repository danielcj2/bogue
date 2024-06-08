import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthentificated: false,
  loadingComponents: [],
  error: null,
  errorComponent: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserLoading: (state, action) => {
      state.loadingComponents.push(action.payload.component);
    },
    stopUserLoading: (state, action) => {
      state.loadingComponents = state.loadingComponents.filter(
        (component) => component !== action.payload.component
      );
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
      state.loadingComponents = [];
      state.errorComponent = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthentificated = false;
      state.error = null;
      state.loadingComponents = [];
      state.errorComponent = null;
    },
    setAuthLoading: (state, action) => {},
  },
});

export const { setUser, logoutUser, setAuthLoading } = authSlice.actions;

export const setUserComponentLoading = (component) => ({
  type: "auth/setUserLoading",
  payload: { component },
});

export const stopUserComponentLoading = (component) => ({
  type: "auth/stopUserLoading",
  payload: { component },
});

export default authSlice.reducer;
