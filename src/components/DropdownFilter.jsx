// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  selectFilters,
  setColor,
  setSize,
  resetFilters,
} from "../features/filters/filterSlice";
import LinkCheckmark from "./LinkCheckmark";
import accessibleColors from "../json/accessibleColors.json";
import accessibleSizes from "../json/accessibleSizes.json";

const DropdownFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

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
              <LinkCheckmark
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
              <LinkCheckmark
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

export default DropdownFilter;
