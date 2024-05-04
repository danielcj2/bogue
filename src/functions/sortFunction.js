import { createSelector } from "@reduxjs/toolkit";
import { selectApparelData } from "../features/apparel/apparelSlice";
import { selectFilters } from "../features/filters/filterSlice";

export const selectSortedApparel = createSelector(
  [selectApparelData, selectFilters],
  (data, filters) => {
    const { size, color, sortBy } = filters;

    let filteredData = [...data];

    if (size && size.length > 0) {
      // Filter the data array to include only items with sizes present in the size array
      filteredData = filteredData.filter(item => item.size && item.size.some(itemSize => size.includes(itemSize)));
    }

    if (color && color.length > 0) {
      // Filter the data array to include only items with colors present in the color array
      filteredData = filteredData.filter(item => item.color && item.color.some(itemColor => color.includes(itemColor)));
    }

    switch (sortBy) {
      case "priceLowToHigh":
        filteredData.sort((a, b) => a.cost - b.cost);
        break;
      case "priceHighToLow":
        filteredData.sort((a, b) => b.cost - a.cost);
        break;
      case "newIn":
        filteredData = filteredData.filter((a) => a.is_new_arrival === true);
        break;
      default:
        //Do nothing
        break;
    }

    return filteredData;
  }
);
