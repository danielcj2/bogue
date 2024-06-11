import { useSearchParams } from "react-router-dom";
import { setSortBy } from "../features/filters/filterSlice";
import { useDispatch } from "react-redux";

import LinkCheckmark from "./LinkCheckmark";
import accessibleSorts from "../json/accessibleSorts.json";

const SortDropdown = ({active}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

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
            <LinkCheckmark 
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
