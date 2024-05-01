import { createSelector } from "@reduxjs/toolkit";
import { selectApparelData } from "../features/apparel/apparelSlice";
import { selectFilters } from "../features/filters/filterSlice";

export const selectSortedApparel = createSelector(
  [selectApparelData, selectFilters],
  (data, filters) => {
    const { size, color, sortBy } = filters;

    let filteredData = [...data];

    if (size && size.length > 0) {
      // Filter apparel by size if size is selected
      filteredData = filteredData.filter(item => size.includes(item.size));
    }

    if (color && color.length > 0) {
      // Filter apparel by color if color is selected
      filteredData = filteredData.filter(item => color.includes(item.color));
    }

    switch (sortBy) {
      case "priceLowToHigh":
        filteredData.sort((a, b) => a.cost - b.cost);
        break;
      case "priceHighToLow":
        filteredData.sort((a, b) => b.cost - a.cost);
        break;
      case "newIn":
        filteredData.filter((a) => a.is_new_arrival === true);
        break;
      default:
        //Do nothing
        break;
    }

    return filteredData;
  }
);
