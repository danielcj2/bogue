import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterParams: {
    color: [],
    size: [],
    sortBy: "default",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setColor(state, action) {
      state.filterParams.color = action.payload;
    },
    setSize(state, action) {
      state.filterParams.size = action.payload;
    },
    setSortBy(state, action) {
      state.filterParams.sortBy = action.payload;
    },
    resetFilters(state) {
      state.filterParams.color = [];
      state.filterParams.size = [];
      state.filterParams.sortBy = "default";
    },
  },
});

export const { setColor, setSize, setSortBy, resetFilters } = filterSlice.actions;

export const selectFilters = (state) => state.filters.filterParams;

export default filterSlice.reducer;
