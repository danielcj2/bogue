import React from "react";
import { useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { IoChevronDownSharp } from "react-icons/io5";

//todo
const Settings = () => {
  const [currDropdown, setCurrDropdown] = useState(false);

  let currRef = useClickOutside(() => {
    setCurrDropdown(false);
  });

  return (
    <div className="settings-bar">
      <div className="settings__currency">
        <div className="settings__dropdown" ref={currRef}>
          <button
            className="settings__dropdown__button"
            onClick={() => {
              setCurrDropdown(!currDropdown);
            }}
          >
            <span className="settings__dropdown__label">USD</span>
            <IoChevronDownSharp className="arrow" />
          </button>
          <ul className={`dropdown ${currDropdown ? "active" : "inactive"}`}>
          </ul>
        </div>
      </div>
      <div className="settings__global">
        <div className="settings__dropdown"></div>
      </div>
    </div>
  );
};

export default Settings;
