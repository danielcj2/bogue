import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hidePopup } from "../features/popup/popupSlice";

import { IoCheckmark } from "react-icons/io5";
import { AiOutlineExclamation } from "react-icons/ai";
// import { GrClose } from "react-icons/gr";

const Popup = () => {
  const dispatch = useDispatch();

  const { message, type, isVisible } = useSelector((state) => state.popup);

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        dispatch(hidePopup());
      }, 6000);

      // Clear timeout on component unmount
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div className={`popup${isVisible ? " active" : ""} ${"popup-" + type}`}>
      <span>
        {type === "success" ? <IoCheckmark /> : <AiOutlineExclamation />}
      </span>
      <p>{message}</p>
      {/* <span className="popup-close" onClick={() => dispatch(hidePopup())}>
        <GrClose />
      </span> */}
    </div>
  );
};

export default Popup;
