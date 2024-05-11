// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  selectFilters,
  setColor,
  setSize,
  resetFilters,
} from "../features/filters/filterSlice";
import OptionLink from "./OptionLink";

export const accessibleColors = [
  {color:"black", colorCode:"#1E1E24"},
  {color:"grey", colorCode:"#7A8B99"},
  {color:"blue", colorCode:"#114afd"},
  {color:"beige", colorCode:"#ebe3d8"},
  {color:"red", colorCode:"#BD1E1E"},
  {color:"white", colorCode:"white"},
  {color:"green", colorCode:"#069E2D"},
  {color:"yellow", colorCode:"#FFD23F"},
];

export const accessibleSizes = [
  { abbreviation: "XS", full: "extra-small" },
  { abbreviation: "S", full: "small" },
  { abbreviation: "M", full: "medium" },
  { abbreviation: "L", full: "large" },
  { abbreviation: "XL", full: "extra-large" },
  { abbreviation: "XXL", full: "extra-extra-large" },
  { abbreviation: "3XL", full: "big-and-tall" },
];

const FilterDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  // useEffect(() => {
  //   // Fetch data from URL parameters and set it to the Redux store
  //   let colors = searchParams.get("color");
  //   let sizes = searchParams.get("size");

  //   if (colors) {
  //     dispatch(setColor(colors.split("%")));
  //   } else {
  //     //reset state
  //     dispatch(setColor([]));
  //   }
  //   if (sizes) {
  //     dispatch(setSize(sizes.split("%")));
  //   } else {
  //     //reset state
  //     dispatch(setSize([]));
  //   }
  // }, [searchParams, dispatch]);

  const toggleColorFilter = (color) => {
    //check for filter
    const updatedColors = checkFilter(filters.color, color);
    dispatch(setColor(updatedColors));

    //update params
    const params = new URLSearchParams(searchParams);
    if (updatedColors.length > 0) {
      params.set("color", updatedColors.join("%"));
    } else {
      //remove query key from URL if no color filters are selected
      params.delete("color");
      //reset state
      dispatch(setColor([]));
    }
    setSearchParams(params);
  };

  const toggleSizeFilter = (size) => {
    //check for filter
    const updatedSizes = checkFilter(filters.size, size);
    dispatch(setSize(updatedSizes));

    //update params
    const params = new URLSearchParams(searchParams);
    if (updatedSizes.length > 0) {
      params.set("size", updatedSizes.join("%"));
    } else {
      //remove query key from URL if no size filters are selected
      params.delete("size");
      dispatch(setSize([]));
    }
    setSearchParams(params);
  };

  const checkFilter = (currentFilter, filter) => {
    const index = currentFilter.indexOf(filter);
    //check if filter exists already
    if (index === -1) {
      //doesn't exist => add
      return [...currentFilter, filter];
    } else {
      //does exist => remove
      return currentFilter.filter((x) => x !== filter);
    }
  };

  const reset = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("size");
    params.delete("color");
    dispatch(resetFilters());
    setSearchParams(params);
  };

  return (
    <>
      <div className="reset__filters">
        <div className="__wrapper">
          <span>You can select more than one filter at a time.</span>
          <div className="reset__filters__button-dark" onClick={reset}>
            Reset
          </div>
        </div>
      </div>
      <ul className="filter__color">
        <li className="filter__title">Color</li>
        {accessibleColors.map((cItem, cIndex) => (
          <li className={`color__${cItem.color}`} key={cIndex}>
            <div onClick={() => toggleColorFilter(cItem.color)}>
              <OptionLink
                type="filter"
                param={cItem.color}
                text={cItem.color.charAt(0).toUpperCase() + cItem.color.slice(1)}
                active={filters.color.includes(cItem.color)}
                parent={`color__${cItem.color}`}
              />
            </div>
          </li>
        ))}
      </ul>
      <ul className="filter__size">
        <li className="filter__title">Product Size</li>
        {accessibleSizes.map((sItem, sIndex) => (
          <li className={`size__${sItem.abbreviation}`} key={sIndex}>
            <div onClick={() => toggleSizeFilter(sItem.full)}>
              <OptionLink
                type="filter"
                param={sItem.full}
                text={sItem.abbreviation}
                active={filters.size.includes(sItem.full)}
                parent={`size__${sItem.abbreviation}`}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FilterDropdown;
