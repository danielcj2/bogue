import { useSearchParams } from "react-router-dom";
import { setSortBy } from "../features/filters/filterSlice";
import { useDispatch } from "react-redux";

import OptionLink from "./OptionLink";

const SortDropdown = ({active}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const accessibleSorts = [
    { param: null, cText: "default", text: "Recommended" },
    { param: "priceHighToLow", cText: "high-low", text: "Price - High to Low" },
    { param: "priceLowToHigh", cText: "low-high", text: "Price - Low to high" },
    { param: "newIn", cText: "new", text: "New In" },
  ];

  // useEffect(() => {
  //   let sortBy = searchParams.get("sortBy");
  //   setActive(sortBy);

  //   dispatch(setSortBy(sortBy));
  // }, [searchParams, dispatch]);

  const toggleSort = (sortBy) => {
    const params = new URLSearchParams(searchParams);
    if (sortBy) {
      params.set("sortBy", sortBy);
    } else {
      //remove query key from URL if no sort is selected
      params.delete("sortBy");
      //reset state
      dispatch(setSortBy([]));
    }
    setSearchParams(params);
  };

  return (
    <>
      {accessibleSorts.map((sItem, sIndex) => (
        <li className={`sort__${sItem.cText}`} key={sIndex}>
          <div onClick={() => toggleSort(sItem.param)}>
            <OptionLink 
              type="sort"
              param={sItem.param}
              text={sItem.text}
              active={active}
              parent={`sort__${sItem.cText}`}
            />
          </div>
        </li>
      ))}
    </>
  );
};

export default SortDropdown;
