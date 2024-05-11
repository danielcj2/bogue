import React from "react";

const Tooltip = ({ text, children, isHovered }) => {
  return (
    <>
      {children}
      <div className={`tooltip ${isHovered ? "active" : "inactive"}`}>
        {text}
      </div>
    </>
  );
};

export default Tooltip;
