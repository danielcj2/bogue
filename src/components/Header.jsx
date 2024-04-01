import React from 'react'
import { useState, useEffect, useRef } from 'react';
import ReactCountryFlag from "react-country-flag";

//icons
import { FiSearch } from "react-icons/fi";
import { LuUserCircle2 } from "react-icons/lu";
import { IoChevronDownSharp } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";

const Header = () => {
  const countryList = [
    {
      id: 0,
      country: "Canada",
      currency: "CAD",
      countryCode: "CA"
    },
    {
      id: 1,
      country: "United States",
      currency: "USD",
      countryCode: "US"
    },
    {
      id: 2,
      country: "France",
      currency: "EUR",
      countryCode: "FR"
    },
    {
      id: 3,
      country: "Spain",
      currency: "EUR",
      countryCode: "ES"
    },
    {
      id: 4,
      country: "Italy",
      currency: "EUR",
      countryCode: "IT"
    },

  ]

  const [currDropdown, setCurrDropdown] = useState(false);

  let useClickOutside = (handler) => {
    let ref = useRef();

    useEffect(() => {
      let clickOutsideHandler = (event) => {
        if(!ref.current.contains(event.target)){
          handler();
        }
      }

        document.addEventListener("mousedown", clickOutsideHandler);

        return(() => {
          document.removeEventListener("mousedown", clickOutsideHandler)
        });
    });

    return ref;
  }

  let currRef = useClickOutside(() => {
    setCurrDropdown(false);
  });

  return (
    <header className="header">
      <div className="header__left">
        <ul className="header-list">
          <li className="header-list__item">
            <a href="/" className="header-list__link">Home</a>
          </li>
          <li className="header-list__item">
            <a href="/" className="header-list__link">Shop All</a>
          </li>
          <li className="header-list__item">
            <div className="header-list__dropdown" ref={currRef}>
              <button className="header-list__dropdown__button" onClick={() => {setCurrDropdown(!currDropdown)}}>
                <div className="country-flag"><ReactCountryFlag countryCode="US" style={{width:30, height:30}} svg /></div>
                <span className="header-list__dropdown__label">USD</span>
                <IoChevronDownSharp />
              </button>
              <ul className={`dropdown ${currDropdown?'active':'inactive'}`}>
                {countryList.map((curr) => <li key={curr.id}className="dropdown__list-item"><div className="country-flag"><ReactCountryFlag countryCode={curr.countryCode} style={{width:30, height:30}} svg /></div><div className="country-currency">{curr.currency}</div></li>)}
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div className="header__right">
        <ul className="header-list">
          <li className="header-list__item">
            <a href="/" className="header-list__link"><FiSearch /></a>
          </li>
          <li className="header-list__item">
            <a href="/" className="header-list__link"><HiOutlineShoppingCart/></a>
          </li>
          <li className="header-list__item">
            <a href="/" className="header-list__link"><LuUserCircle2 /></a>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
