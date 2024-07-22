import React, { useState } from "react";

//components
import Header from "../layout/Header";
import Modal from "../components/Modal";

import useClickOutside from "../hooks/useClickOutside";

import img1 from "../imgs/img1.jpg";
import img2 from "../imgs/img2.jpg";

//layout
import AccessPortal from "../layout/AccessPortal";
import ShoppingCart from "../layout/ShoppingCart";

const Homepage = () => {
  const [modal, setModal] = useState("");
  let modalRef = useClickOutside(() => {
    setModal("");
  });

  return (
    <>
      <div className="notice">Free shipping on orders over $100 CAD</div>
      <Header setModal={setModal} />
      <div className="section">
        <div className="section__home">
          <div className="section__home__split split__left">
            <img src={img1} alt="home background left"/>
          </div>
          <div className="section__home__split split__right">
            <img src={img2} alt="home background right"/>
          </div>
        </div>
      </div>
      <div className="modals" ref={modalRef}>
        <Modal
          title="access portal"
          isActive={modal === "access-portal" && true}
          type="side"
          id="access-portal"
          setModal={setModal}
        >
          <AccessPortal />
        </Modal>
        <Modal
          title="shopping cart"
          isActive={modal === "cart" && true}
          type="side"
          id="shopping-cart"
          setModal={setModal}
        >
          <ShoppingCart />
        </Modal>
      </div>
    </>
  );
};

export default Homepage;
