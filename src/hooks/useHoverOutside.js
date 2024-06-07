import { useEffect, useRef } from "react";

const useHoverOutside = (handler) => {
    let ref = useRef();

    useEffect(() => {
      let hoverOutsideHandler = (event) => {
        if(!ref?.current){
          return;
        }
        
        if(!ref.current.contains(event.target)){
          handler();
        }
      }

        document.addEventListener("mouseover", hoverOutsideHandler);

        return(() => {
          document.removeEventListener("mouseover", hoverOutsideHandler)
        });
    });

    return ref;
}

export default useHoverOutside;