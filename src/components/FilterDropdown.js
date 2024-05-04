import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setColor, setSize } from "../features/filters/filterSlice";
import OptionLink from "./OptionLink";

const FilterDropdown = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    let colors = searchParams.get("color");
    let sizes = searchParams.get("size");

    if (colors) {
      setSelectedColors(colors.split("%"));
      dispatch(setColor(selectedColors));
    } else {
      //reset state
      setSelectedColors([]);
      dispatch(setColor([]));
    }
    if (sizes) {
      setSelectedSizes(sizes.split("%"));
      dispatch(setSize(selectedSizes));
    } else {
      //reset state
      setSelectedSizes([]);
      dispatch(setSize([]));
    }
  }, [searchParams, dispatch]);

  const toggleColorFilter = (color) => {
    //check for filter
    const updatedColors = checkFilter(selectedColors, color);
    setSelectedColors(updatedColors);

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
    const updatedSizes = checkFilter(selectedSizes, size);
    setSelectedSizes(updatedSizes);

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

  return (
    <>
      <ul className="filter__color">
        <li className="filter__title">Color</li>
        <li className="color__black">
          <div onClick={() => toggleColorFilter("black")}>
            <OptionLink type="filter" param="black" text="Black" />
          </div>
        </li>
        <li className="color__grey">
          <div onClick={() => toggleColorFilter("grey")}>
            <OptionLink type="filter" param="grey" text="Grey" />
          </div>
        </li>
        <li className="color__blue">
          <div onClick={() => toggleColorFilter("blue")}>
            <OptionLink type="filter" param="Blue" text="Blue" />
          </div>
        </li>
        <li className="color__beige">
          <div onClick={() => toggleColorFilter("beige")}>
            <OptionLink type="filter" param="beige" text="Beige" />
          </div>
        </li>
        <li className="color__red">
          <div onClick={() => toggleColorFilter("red")}>
            <OptionLink type="filter" param="red" text="Red" />
          </div>
        </li>
        <li className="color__white">
          <div onClick={() => toggleColorFilter("white")}>
            <OptionLink type="filter" param="white" text="White" />
          </div>
        </li>
        <li className="color__green">
          <div onClick={() => toggleColorFilter("green")}>
            <OptionLink type="filter" param="green" text="Green" />
          </div>
        </li>
        <li className="color__yellow">
          <div onClick={() => toggleColorFilter("yellow")}>
            <OptionLink type="filter" param="yellow" text="Yellow" />
          </div>
        </li>
      </ul>
      <ul className="filter__size">
        <li className="filter__title">Product Size</li>
        <li className="size__xs">
          <div onClick={() => toggleSizeFilter("extra-small")}>XS</div>
        </li>
        <li className="size__s">
          <div onClick={() => toggleSizeFilter("small")}>S</div>
        </li>
        <li className="size__m">
          <div onClick={() => toggleSizeFilter("medium")}>M</div>
        </li>
        <li className="size__l">
          <div onClick={() => toggleSizeFilter("large")}>L</div>
        </li>
        <li className="size__xl">
          <div onClick={() => toggleSizeFilter("extra-large")}>XL</div>
        </li>
        <li className="size__xxl">
          <div onClick={() => toggleSizeFilter("extra-extra-large")}>XXL</div>
        </li>
        <li className="size__3xl">
          <div onClick={() => toggleSizeFilter("big-and-tall")}>3XL</div>
        </li>
      </ul>
    </>
  );
};

export default FilterDropdown;
