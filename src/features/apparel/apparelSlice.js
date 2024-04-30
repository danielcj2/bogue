import { createSlice } from "@reduxjs/toolkit";
import {
  fetchApparel,
  fetchCategoryBySlug,
  fetchSubcategories,
  fetchDefaultApparel,
} from "./apparelAsyncThunks";

const apparelSlice = createSlice({
  name: "apparel",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(fetchCategoryBySlug.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(fetchCategoryBySlug.rejected, (state, action) => {
        // state.loading = false;
        state.data = null;
        state.error = "Error fetching category ID: " + action.error.message;
      })
      .addCase(fetchCategoryBySlug.fulfilled, (state, action) => {
        // state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = "Error fetching subcategory IDs: " + action.error.message;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.data = action.payload;
        // state.loading = false;
      })
      // .addCase(fetchApparel.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(fetchApparel.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error fetching apparel data: " + action.error.message;
      })
      .addCase(fetchApparel.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchDefaultApparel.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDefaultApparel.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = "Error fetching apparel data: " + action.error.message;
      })
      .addCase(fetchDefaultApparel.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  },
});

export const { } = apparelSlice.actions;
export const selectApparelData = (state) => state.apparel.data;

export default apparelSlice.reducer;
