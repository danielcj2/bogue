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
      state.color = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    resetFilters(state) {
      state.color = [];
      state.size = [];
      state.sortBy = "default";
    },
  },
});

export const { setColor, setSize, setSortBy, resetFilters } = filterSlice.actions;
export const selectSort = (state) => state.filterParams.sortBy;

export default filterSlice.reducer;
