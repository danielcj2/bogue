import { useState } from "react";
import { Link } from "react-router-dom";

//hooks
import useHoverOutside from "../hooks/useHoverOutside";

//icons & images
import { FiSearch } from "react-icons/fi";
import { LuUserCircle2 } from "react-icons/lu";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { ReactComponent as Logo } from "../svgs/logo.svg";
import { IoIosLogOut } from "react-icons/io";

//layout
import CategoryList from "./CategoryList";

import { useDispatch, useSelector } from "react-redux";
import { handleSignOut } from "../functions/authenticationFunctions";

//todo
const Header = ({ setModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [optionsDropdown, setOptionsDropdown] = useState(false);
  let optionsRef = useHoverOutside(() => {
    setOptionsDropdown(false);
  });

  return (
    <header className="header">
      <div className="header__left" ref={optionsRef}>
        <ul className="header-list">
          <li className="header-list__item">
            <Link to="/catalog" className="header-list__link">
              Browse All
            </Link>
          </li>
          <li className="header-list__item">
            <Link to="/catalog?sortBy=newIn" className="header-list__link">
              New Arrivals
            </Link>
          </li>
          <li className="header-list__item">
            <Link
              className="header-list__link"
              onMouseEnter={() => {
                setOptionsDropdown(!optionsDropdown);
              }}
            >
              Men's Fashion
            </Link>
          </li>
          <div
            className={`header-list__item__options__dropdown dropdown-long ${
              optionsDropdown ? "active" : "inactive"
            }`}
          >
            <CategoryList />
          </div>
        </ul>
      </div>
      <div className="header__center">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="header__right">
        <ul className="header-list">
          <li className="header-list__item">
            <a href="/" className="header-list__link">
              <FiSearch />
            </a>
          </li>
          <li className="header-list__item">
            <div className="header-list__dropdown">
              <button className="header-list__dropdown__button">
                <HiOutlineShoppingCart />
              </button>
            </div>
          </li>
          <li className="header-list__item">
            <div
              className="header-list__link"
              style={{ cursor: "pointer" }}
              onClick={() => setModal("access-portal")}
            >
              <LuUserCircle2 />
            </div>
          </li>
        </ul>
      </div>
      <div
        className={`header__left${
          user?.identities ? " user-portal__controls" : ""
        } user-portal__hidden`}
      ></div>
      <div
        className={`header__right${
          user?.identities ? " user-portal__controls" : ""
        } user-portal__hidden`}
      >
        <ul className="header-list">
          <li className="header-list__item">
            <div className="user-portal__logout cap">
              <span onClick={() => handleSignOut(dispatch)}>
                Log out
                <IoIosLogOut />
              </span>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
