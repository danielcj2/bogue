import { Link } from "react-router-dom";

const FilterDropdown = () => {
  return (
    <>
      <li className="sort__new">
        <Link to="?sortBy=newIn">New In</Link>
      </li>
    </>
  );
};

export default FilterDropdown;
