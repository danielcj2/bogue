import React from 'react'
import { useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import { IoChevronDownSharp } from "react-icons/io5";

const Settings = () => {
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

    let currRef = useClickOutside(() => {
        setCurrDropdown(false);
    });

    return (
        <div className="settings-bar">
            <div className="settings__currency">
                <div className="settings__dropdown" ref={currRef}>
                    <button className="settings__dropdown__button" onClick={() => {setCurrDropdown(!currDropdown)}}>
                        <span className="settings__dropdown__label">USD</span>
                        <IoChevronDownSharp className="arrow"/>
                    </button>
                    <ul className={`dropdown ${currDropdown?'active':'inactive'}`}>
                        {countryList.map((curr) => <li key={curr.id}className="dropdown__list-item"><div className="country-flag"></div><div className="country-currency">{curr.currency}</div></li>)}
                    </ul>
                </div>
            </div>
            <div className="settings__global">
                <div className="settings__dropdown">
                    
                </div>
            </div>
        </div>
  )
}

export default Settings
