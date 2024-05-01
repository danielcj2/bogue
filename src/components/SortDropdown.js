import { Link } from "react-router-dom";

const SortDropdown = () => {
  return (
    <>
      <li className="sort__normal">
        <Link to="?">Recommended</Link>
      </li>
      <li className="sort__high-low">
        <Link to="?sortBy=priceHighToLow">Price - High to Low</Link>
      </li>
      <li className="sort__low-high">
        <Link to="?sortBy=priceLowToHigh">Price - Low to High</Link>
      </li>
      <li className="sort__new">
        <Link to="?sortBy=newIn">New In</Link>
      </li>
    </>
  );
};

export default SortDropdown;
