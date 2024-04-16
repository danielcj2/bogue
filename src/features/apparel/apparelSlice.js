import { createSlice } from "@reduxjs/toolkit";
import {
  fetchApparel,
  fetchCategoryBySlug,
  fetchSubcategoriesRecursive,
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
      .addCase(fetchCategoryBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryBySlug.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = "Error fetching category ID: " + action.error.message;
      })
      .addCase(fetchCategoryBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchApparel.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchApparel.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error fetching apparel data: " + action.error.message;
      })
      .addCase(fetchApparel.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubcategoriesRecursive.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubcategoriesRecursive.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = "Error fetching subcategory IDs: " + action.error.message;
      })
      .addCase(fetchSubcategoriesRecursive.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      });
  },
});

export default apparelSlice.reducer;
