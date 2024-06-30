import React from "react";
import { GrClose } from "react-icons/gr";

const PopupAlert = ({alert, setAlert}) => {
  return (
    <div className="alert">
      <div className="__container">
        <span className="alert__state upp">{alert.state}</span>
        <span
          onClick={() =>
            setAlert({
              type: "",
              state: "",
              message: "",
            })
          }
        >
          <GrClose />
        </span>
      </div>
      <p>{alert.message}</p>
    </div>
  );
};

export default PopupAlert;
