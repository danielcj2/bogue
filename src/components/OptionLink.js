import React from "react";
import { IoCheckmark } from "react-icons/io5";

const OptionLink = ({ type, param, text, active }) => {
  return (
    <div>
      <label htmlFor={`${type}__${param}`}>
        <span className="icon">{active === param && <IoCheckmark />}</span>
      </label>
      <span style={{fontWeight: active === param && 700}}>{text}</span>
    </div>
  );
};

export default OptionLink;
