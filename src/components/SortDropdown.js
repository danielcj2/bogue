import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { setSortBy } from "../features/filters/filterSlice";
import { useDispatch } from "react-redux";

import OptionLink from "./OptionLink";

const SortDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    let sortBy = searchParams.get("sortBy");
    setActive(sortBy);

    dispatch(setSortBy(sortBy));
  }, [searchParams, dispatch]);

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
      <li className="sort__default">
        <div onClick={() => toggleSort()}>
          <OptionLink
            type="sort"
            param={null}
            text="Recommended"
            active={active}
            setActive={setActive}
          />
        </div>
      </li>
      <li className="sort__high-low">
        <div onClick={() => toggleSort("priceHighToLow")}>
          <OptionLink
            type="sort"
            param="priceHighToLow"
            text="Price - High to Low"
            active={active}
            setActive={setActive}
          />
        </div>
      </li>
      <li className="sort__low-high">
        <div onClick={() => toggleSort("priceLowToHigh")}>
          <OptionLink
            type="sort"
            param="priceLowToHigh"
            text="Price - Low to High"
            active={active}
            setActive={setActive}
          />
        </div>
      </li>
      <li className="sort__new">
        <div onClick={() => toggleSort("newIn")}>
          <OptionLink
            type="sort"
            param="newIn"
            text="New In"
            active={active}
            setActive={setActive}
          />
        </div>
      </li>
    </>
  );
};

export default SortDropdown;
