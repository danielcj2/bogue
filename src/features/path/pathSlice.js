import { createSlice } from "@reduxjs/toolkit";
import { fetchDefaultPath, fetchParentCategories } from "./pathAsyncThunks";

const pathSlice = createSlice({
  name: "path",
  initialState: {
    pData: [],
    pLoading: false,
    pError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParentCategories.pending, (state) => {
        state.pLoading = true;
      })
      .addCase(fetchParentCategories.rejected, (state, action) => {
        state.pLoading = false;
        state.pData = [];
        state.pError = "Error fetching parent IDs: " + action.error.message;
      })
      .addCase(fetchParentCategories.fulfilled, (state, action) => {
        state.pData = action.payload;
        state.pLoading = false;
      }).addCase(fetchDefaultPath.pending, (state) => {
        state.pLoading = true;
      })
      .addCase(fetchDefaultPath.rejected, (state, action) => {
        state.pLoading = false;
        state.pData = [];
        state.pError = action.error.message;
      })
      .addCase(fetchDefaultPath.fulfilled, (state, action) => {
        state.pData = action.payload;
        state.pLoading = false;
      });
  },
});

export default pathSlice.reducer;
