import { createSelector } from "@reduxjs/toolkit";
import { selectApparelData } from "../features/apparel/apparelSlice";
import { selectSort } from "../features/filters/filterSlice";

export const selectSortedApparel = createSelector(
  [selectApparelData, selectSort],
  (data, sort) => {
    switch (sort) {
      case "asc":
        data = data.sort((a, b) => a.cost - b.cost);
        break;
      case "desc":
        data = data.sort((a, b) => b.cost - a.cost);
        break;
      case "new":
        data = data.filter((a) => a.is_new_arrival === true);
        break;
      default:
        //Do nothing
        break;
    }
  }
);
