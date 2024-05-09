import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//components
import Header from "../components/Header";
import Notice from "../components/Notice";

//svg icons
import { IoChevronDownSharp } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { PiRuler } from "react-icons/pi";
import { ReactComponent as Heart } from "../svgs/heart.svg";
import { ReactComponent as HeartRed } from "../svgs/heart-red.svg";
import { ReactComponent as IconDivider } from "../svgs/icon-divider.svg";

//imgs
import tshirtModelImg from "../imgs/crewneck_shirt_red.png";
import { fetchProduct } from "../features/product/productAsyncThunks";


const Product = () => {
  const dispatch = useDispatch();
  const {product, filters, loading, error} = useSelector((state) => state.product);
  
  const [hover, setHover] = useState(false);

  //Product Info Toggles
  const [compDropdown, setCompDropdown] = useState(false);
  const [descDropdown, setDescDropdown] = useState(false);

  //Filter Button Dropdowns
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [filterType, setFilterType] = useState("");

  const handleFiltersDropdown = (type) => {
    if (filterType === type && filterDropdown === true) {
      setFilterDropdown(false);
    } else {
      setFilterDropdown(true);
    }
    setFilterType(type);
  };

  const { product_id } = useParams();

  useEffect(() => {
    dispatch(fetchProduct(product_id));
  },[product_id, dispatch]);

  return (
    <>
      <Notice duplicate="9" />
      <Header />
      <div className="section">
        <div className="section__spacer"></div>
        <div className="section__product">
          <div className="section__product__image">
            <img src={tshirtModelImg} alt="tshirt model pose"></img>
          </div>
          <div className="section__product__carousel"><IconDivider /></div>
          <div className="section__product__details">
            <div className="product__card">
              <div className="product__card__header">
                <div className="__container">
                  <div className="product__card__title bold cap">
                    {product.apparel_name}
                  </div>
                  <button
                    className="favorite"
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    {hover ? <HeartRed /> : <Heart />}
                  </button>
                </div>
                <div className="product__card__cost bold">${product.cost}</div>
              </div>
              <div className="product__card__filters">
                <div
                  className="card__filter__color"
                  onClick={() => {
                    handleFiltersDropdown("color");
                  }}
                >
                  Colour
                </div>
                <div
                  className="card__filter__size"
                  onClick={() => {
                    handleFiltersDropdown("size");
                  }}
                >
                  Size
                </div>
              </div>
              <div className="product__card__filters__dropdown">
                <div
                  className={`dropdown-block ${
                    filterDropdown ? "active" : "inactive"
                  }`}
                >
                  {filterType === "color" ? "Color" : "Size"}
                </div>
              </div>
              <div className="product__card__dynamic__wrapper">
                <div className="product__info__controls">
                  Find your size <PiRuler />
                </div>
                <button className="product__cart__button-dark">
                  <HiOutlineShoppingCart />
                  <div>add to cart</div>
                </button>
                <div className="product__info__controls">
                  Shipping, Exchanges and Returns
                </div>
              </div>
              <div className="product__card__toggle__wrapper">
                <div>
                  <div
                    className="description__toggle__container"
                    onClick={() => {
                      setDescDropdown(!descDropdown);
                    }}
                  >
                    <div className="description__text">Description</div>
                    <IoChevronDownSharp />
                  </div>
                  <div className="description__dropdown">
                    <div
                      className={`dropdown-block ${
                        descDropdown ? "active" : "inactive"
                      }`}
                    >
                      {product.description}
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    className="composition__toggle__container"
                    onClick={() => {
                      setCompDropdown(!compDropdown);
                    }}
                  >
                    <div className="composition__text">
                      Composition & Care Guide
                    </div>
                    <IoChevronDownSharp />
                  </div>
                  <div className="composition__dropdown">
                    <div
                      className={`dropdown-block ${
                        compDropdown ? "active" : "inactive"
                      }`}
                    >
                      <div>{product.composition}</div>
                      <div>{product.care}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
