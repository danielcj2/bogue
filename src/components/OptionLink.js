import React, { useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";

const OptionLink = ({ type, param, text, active, parent }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(active);
  }, [active]);

  const toggleChecked = () => {
    type==="filter" && setIsChecked(!isChecked);
  }

  return (
    <div onClick={toggleChecked}>
      <label htmlFor={parent}>
        <span className="icon">{(active === param || isChecked === true) && <IoCheckmark />}</span>
      </label>
      <span style={{fontWeight: (active === param || isChecked === true) && 700}}>{text}</span>
    </div>
  );
};

export default OptionLink;
