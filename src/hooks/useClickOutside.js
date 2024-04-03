import { useEffect, useRef } from "react";

const useClickOutside = (handler) => {
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

export default useClickOutside;