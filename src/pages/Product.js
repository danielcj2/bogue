import React from 'react'
import Header from '../components/Header'
import tshirtModelImg from '../imgs/tshirt-stock-model.jpg'
import Notice from '../components/Notice'
import { IoChevronDownSharp } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { PiRuler } from "react-icons/pi";
import { useState } from 'react';

const Product = () => {
    const [colourDropdown, setColourDropdown] = useState(false);
    const [SizeDropdown, setSizeDropdown] = useState(false);
    const [compDropdown, setCompDropdown] = useState(false);
    const [descDropdown, setDescDropdown] = useState(false);

  return (
    <>
      <Header />
      <div className="section">
        <div className="section__product">
            <div className="section__product__image">
                <img src={tshirtModelImg} alt="tshirt model pose"></img>
            </div>
            <div className="section__product__details">
                <Notice duplicate="5" />
                <div className="section__product__details__background">
                    <div className="product__card">
                        <div className="product__card__info">
                            <div className="card__item__title bold cap">regular plaint t-shirt</div>
                            <div className="card__item__cost bold">$70.00</div>
                        </div>
                        <div>
                            <div className="product__card__filters">
                                <div className="card__filter__colour" onClick={() => {setColourDropdown(!colourDropdown)}}>Colour</div>
                                <div className="card__filter__size" onClick={() => {setColourDropdown(!colourDropdown)}}>Size</div>
                            </div>
                            <div className="colour__dropdown">
                                <div className={`dropdown-block ${colourDropdown?'active':'inactive'}`}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                </div>
                            </div>
                        </div>
                        <div className="product__card__dynamic__wrapper">
                            <div className="product__info__controls">Find your size <PiRuler/></div>
                            <button className="product__cart__button-dark">
                                <HiOutlineShoppingCart/>
                                <div>add to cart</div></button>
                            <div className="product__info__controls">Shipping, Exchanges and Returns</div>
                        </div>
                        <div className="product__card__toggle__wrapper">
                            <div>
                                <div className="description__toggle__container" onClick={() => {setDescDropdown(!descDropdown)}}>
                                    <div className="description__text">Description</div>
                                    <IoChevronDownSharp />
                                </div>
                                <div className="description__dropdown">
                                    <div className={`dropdown-block ${descDropdown?'active':'inactive'}`}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="composition__toggle__container" onClick={() => {setCompDropdown(!compDropdown)}}>
                                    <div className="composition__text">Composition & Care Guide</div>
                                    <IoChevronDownSharp />
                                </div>
                                <div className="composition__dropdown">
                                    <div className={`dropdown-block ${compDropdown?'active':'inactive'}`}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Product
