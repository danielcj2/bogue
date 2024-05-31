import React, { useEffect } from "react";

import { useState } from "react";
import { Link } from "react-router-dom";

//hooks
import useHoverOutside from "../hooks/useHoverOutside";

//icons & images
import { FiSearch } from "react-icons/fi";
import { LuUser2, LuUserCircle2 } from "react-icons/lu";
import { HiOutlineShoppingCart } from "react-icons/hi";
import tshirt from "../imgs/crewneck_shirt_red.png";
import { ReactComponent as Logo } from "../svgs/logo.svg";
import CategoryList from "./CategoryList";
import { useSelector } from "react-redux";
import { handleSignOut } from "../functions/authenticationFunctions";

const Header = ({ setModal }) => {
  const [cartDropdown, setCartDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    user?.aud === "authenticated" ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user]);

  let cartRef = useHoverOutside(() => {
    setCartDropdown(false);
  });

  const [optionsDropdown, setOptionsDropdown] = useState(false);
  const [logoutDropdown, setLogoutDropdown] = useState(false);

  let optionsRef = useHoverOutside(() => {
    setOptionsDropdown(false);
  });

  let logoutRef = useHoverOutside(() => {
    setLogoutDropdown(false);
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
            <div className="header-list__dropdown" ref={cartRef}>
              <button
                className="header-list__dropdown__button"
                onMouseEnter={() => {
                  setCartDropdown(!cartDropdown);
                }}
              >
                <HiOutlineShoppingCart />
              </button>
              <ul
                className={`dropdown ${cartDropdown ? "active" : "inactive"}`}
              >
                <div className="shop-cart-item__container">
                  <div className="shop-cart-item__image-right">
                    <img src={tshirt} alt="stock t-shirt"></img>
                  </div>
                  <div className="shop-cart-item">
                    <h4 className="shop-cart-item__header">
                      Regular Plain T-Shirt
                    </h4>
                    <div className="shop-cart-item__cost bold">$70.00</div>
                    <div className="shop-cart-item__spacer__container"></div>
                    <div className="shop-cart-item__size__container__start">
                      <div className="size__text">Size:</div>
                      <div className="size">L</div>
                    </div>
                    <div className="shop-cart-item__quantity__container__start">
                      <div className="quantity__text">Quantity:</div>
                      <div className="quantity">1</div>
                    </div>
                  </div>
                </div>
                <div className="dropdown__break">
                  <hr />
                </div>
                <div className="dropdown__subtotal__container">
                  <div className="subtotal__text">Order</div>
                  <div className="subtotal__cost">$70.00</div>
                </div>
                <div className="dropdown__shipping__container">
                  <div className="shipping__text">Shipping</div>
                  <div className="shipping__cost">$7.00</div>
                </div>
                <div className="dropdown__break">
                  <hr />
                </div>
                <div className="dropdown__total__container">
                  <div className="total__text bold">TOTAL</div>
                  <div className="total__cost bold">$77.00</div>
                </div>
                <div className="dropdown__checkout__container">
                  <button className="checkout__button-dark">CHECKOUT</button>
                </div>
                <div className="dropdown__shopping-cart__container">
                  <button className="shopping-cart__button-light">
                    VIEW SHOPPING CART
                  </button>
                </div>
              </ul>
            </div>
          </li>
          <li
            className="header-list__item"
            ref={logoutRef}
            onMouseEnter={() => {
              setLogoutDropdown(!logoutDropdown);
            }}
          >
            {isLoggedIn ? (
              <>
                <a href="/" className="header-list__link">
                  <LuUser2 />
                </a>
                <ul
                  className={`dropdown ${
                    logoutDropdown ? "active" : "inactive"
                  }`}
                >
                  <div onClick={handleSignOut}>Logout</div>
                </ul>
              </>
            ) : (
              <div
                className="header-list__link"
                style={{ cursor: "pointer" }}
                onClick={() => setModal("access-portal")}
              >
                <LuUserCircle2 />
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
