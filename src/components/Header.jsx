import React from 'react'
import { useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import tshirt from '../imgs/crewneck_shirt_red.png';
import { Link } from 'react-router-dom';
//icons
import { FiSearch } from "react-icons/fi";
import { LuUserCircle2 } from "react-icons/lu";
import { HiOutlineShoppingCart } from "react-icons/hi";

const Header = () => {
  const [cartDropdown, setCartDropdown] = useState(false);

  let cartRef = useClickOutside(() => {
    setCartDropdown(false);
  });

  return (
    <header className="header">
      <div className="header__left">
        <ul className="header-list">
          <li className="header-list__item">
            <Link to="/" className="header-list__link">Home</Link>
          </li>
          <li className="header-list__item">
            <Link to="/catalog" className="header-list__link">Shop All</Link>
          </li>
        </ul>
      </div>
      <div className="header__right">
        <ul className="header-list">
          <li className="header-list__item">
            <a href="/" className="header-list__link"><FiSearch /></a>
          </li>
          <li className="header-list__item">
            <div className="header-list__dropdown" ref={cartRef}>
              <button className="header-list__dropdown__button" onClick={() => {setCartDropdown(!cartDropdown)}}>
                <HiOutlineShoppingCart/>
              </button>
              <ul className={`dropdown ${cartDropdown?'active':'inactive'}`}>
                <div className="shop-cart-item__container">
                  <div className="shop-cart-item__image-right"><img src={tshirt} alt="stock t-shirt"></img></div>
                  <div className="shop-cart-item">
                    <h4 className="shop-cart-item__header">Regular Plain T-Shirt</h4>
                    <div className="shop-cart-item__cost bold">$70.00</div>
                    <div className="shop-cart-item__spacer__container"></div>
                    <div className="shop-cart-item__size__container__start">
                      <div className="size__text">Size:</div>
                      <div className="size">L</div>
                    </div>
                    <div className="shop-cart-item__quantity__container__start">
                      <div className="quantity__text">Quantity:</div>
                      <div className="quantity">1</div>
                    </div>
                  </div>
                </div>
                <div className="dropdown__break"><hr /></div>
                <div className="dropdown__subtotal__container">
                  <div className="subtotal__text">Order</div>
                  <div className="subtotal__cost">$70.00</div>
                </div>
                <div className="dropdown__shipping__container">
                  <div className="shipping__text">Shipping</div>
                  <div className="shipping__cost">$7.00</div>
                </div>
                <div className="dropdown__break"><hr /></div>
                <div className="dropdown__total__container">
                  <div className="total__text bold">TOTAL</div>
                  <div className="total__cost bold">$77.00</div>
                </div>
                <div className="dropdown__checkout__container">
                  <button className="checkout__button-dark">CHECKOUT</button>
                </div>
                <div className="dropdown__shopping-cart__container">
                  <button className="shopping-cart__button-light">VIEW SHOPPING CART</button>
                </div>
              </ul>
            </div>
          </li>
          <li className="header-list__item">
            <a href="/" className="header-list__link"><LuUserCircle2 /></a>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
