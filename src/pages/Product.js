import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//functions
import { fetchProduct } from "../features/product/productAsyncThunks";
import handleOptionDropdown from "../functions/handleOptionDropdown";

//components
import Header from "../components/Header";
import Notice from "../components/Notice";
import Tooltip from "../components/Tooltip";
import ProductGallery from "../components/ProductGallery";
import Modal from "../components/Modal";

//acessible filters
import {
  accessibleColors,
  accessibleSizes,
} from "../components/FilterDropdown";

//svg icons
import { HiOutlineShoppingCart } from "react-icons/hi";
import { PiRuler } from "react-icons/pi";
import { ReactComponent as Heart } from "../svgs/heart.svg";
import { ReactComponent as HeartRed } from "../svgs/heart-red.svg";
import { ReactComponent as Mastercard } from "../svgs/mastercard.svg";
import { ReactComponent as Visa } from "../svgs/visa.svg";
import { ReactComponent as PayPal } from "../svgs/paypal.svg";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Product = () => {
  const dispatch = useDispatch();
  const { product, filters, loading, error } = useSelector(
    (state) => state.product
  );

  //heart svg fill
  const [favoriteHeart, setFavoriteHeart] = useState(false);
  //Color / Size Button Dropdowns
  const [variantDropdown, setVariantDropdown] = useState(false);
  const [variantType, setVariantType] = useState("");
  //tooltip & selected variants
  const [tooltipHover, setTooltipHover] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleSelectedVariants = (type, isInStock, setType) => {
    if (isInStock === "in-stock") {
      setType(type);
    }
  };

  //Product Info toggle
  const [optionsType, setOptionsType] = useState("description");

  //Show More text expand Button
  const [showMore, setShowMore] = useState(false);

  const { product_id } = useParams();

  useEffect(() => {
    dispatch(fetchProduct(product_id.toLowerCase()));
  }, [product_id, dispatch]);

  const carouselContainerRef = useRef(null);
  const carouselContentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!carouselContentRef.current || !carouselContainerRef) return;

      const container = carouselContainerRef.current.getBoundingClientRect();
      const content = carouselContentRef.current.getBoundingClientRect();

      // Calculate the new scroll position for the child element
      const maxScroll = container.height - content.height;

      const scrollFactor = 0.5;
      const newTop = Math.min(
        (window.scrollY - container.top + 0.1 * window.innerHeight) *
          scrollFactor,
        maxScroll
      );

      carouselContentRef.current.style.top = newTop + "px";
    };

    // Update child position on scroll
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Update child position on initial load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollProgressRef = useRef(null);

  useEffect(() => {
    const handleProgress = () => {
      const progress = scrollProgressRef.current;
      if (!progress) return;

      const { top, height } = progress.getBoundingClientRect();
      
      // Calculate the scrolled distance from the top of the component, + offset
      const scrolledPastComponent = Math.max(0, -top + 0.5 * window.innerHeight);

      // Calculate the total scrollable distance of the component
      const totalScrollableDistance = height - 0.5 * window.innerHeight;

      const progressPercentage = Math.min(
        100,
        (scrolledPastComponent / totalScrollableDistance) * 100
      );

      setScrollProgress(progressPercentage);
    };

    window.addEventListener("scroll", handleProgress);
    handleProgress();
    return () => {
      window.removeEventListener("scroll", handleProgress);
    };
  });

  const [modal, setModal] = useState("");

  return (
    <>
      <Notice duplicate="9" />
      <Header />
      <div className="section">
        {error && <p>404</p>}
        {loading ? (
          "Loading"
        ) : (
          <div className="section__product">
            <div
              className="section__product__carousel"
              ref={scrollProgressRef}
            >
              <ProductGallery />
            </div>
            <div
              className="section__product__carousel-paging"
              ref={carouselContainerRef}
            >
              <div className="carousel-paging__content" ref={carouselContentRef}>
                <div className="progress-bar">
                  <div
                    className="progress-bar__fill"
                    style={{ height: `${scrollProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="section__product__details">
              <div className="product__card">
                <div className="product__card__header">
                  <div className="product__card__header__material cap">
                    {product.metadata.material}
                  </div>
                  <div className="__container">
                    <div className="product__card__header__title bold cap">
                      {product.apparel_name}
                    </div>
                    <button
                      className="favorite"
                      onMouseEnter={() => setFavoriteHeart(true)}
                      onMouseLeave={() => setFavoriteHeart(false)}
                    >
                      {favoriteHeart ? <HeartRed /> : <Heart />}
                    </button>
                  </div>
                  <div className="product__card__header__cost bold">
                    ${product.cost}
                  </div>
                </div>
                <div className="product__card__filters __container">
                  <div className="product__card__filters__controls">
                    <div
                      className={`card__filter__color upp ${
                        variantType === "color" &&
                        variantDropdown === true &&
                        "selected"
                      }`}
                      onClick={() => {
                        handleOptionDropdown(
                          "color",
                          variantType,
                          setVariantType,
                          variantDropdown,
                          setVariantDropdown
                        );
                      }}
                    >
                      Colour
                    </div>
                    <div
                      className={`card__filter__size upp ${
                        variantType === "size" &&
                        variantDropdown === true &&
                        "selected"
                      }`}
                      onClick={() => {
                        handleOptionDropdown(
                          "size",
                          variantType,
                          setVariantType,
                          variantDropdown,
                          setVariantDropdown
                        );
                      }}
                    >
                      Size
                    </div>
                  </div>
                  <div className="product__card__filters__selected">
                    <div className="filters__selected-color cap">
                      colour:{" "}
                      {selectedColor === "" ? (
                        <span>select</span>
                      ) : (
                        <span>{selectedColor}</span>
                      )}
                    </div>
                    <div className="filters__selected-size cap">
                      size:{" "}
                      {selectedSize === "" ? (
                        <span>select</span>
                      ) : (
                        <span>{selectedSize}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="product__card__filters__controls__dropdown">
                  <div
                    className={`dropdown-long ${
                      variantDropdown ? "active" : "inactive"
                    }`}
                  >
                    {variantType === "color" &&
                      accessibleColors.map((cItem, cIndex) => {
                        const isInStock =
                          product.color &&
                          product.color.find((item) => item === cItem.color)
                            ? "in-stock"
                            : "out-of-stock";
                        return (
                          <label
                            className={`product-color ${isInStock} ${
                              isInStock === "in-stock" &&
                              selectedColor === cItem.color
                                ? "selected"
                                : "not-selected"
                            }`}
                            key={cIndex}
                            style={{ backgroundColor: cItem.colorCode }}
                            onMouseEnter={() => setTooltipHover(cItem.color)}
                            onMouseLeave={() => setTooltipHover("")}
                            onClick={() => {
                              handleSelectedVariants(
                                cItem.color,
                                isInStock,
                                setSelectedColor
                              );
                            }}
                          >
                            <Tooltip
                              text={cItem.color}
                              isHovered={
                                isInStock === "in-stock" &&
                                cItem.color === tooltipHover
                              }
                            >
                              <input name="color-input" type="checkbox" />
                              <div className="color-box"></div>
                            </Tooltip>
                          </label>
                        );
                      })}
                    {variantType === "size" &&
                      accessibleSizes.map((sItem, sIndex) => {
                        const isInStock =
                          product.size &&
                          product.size.find((item) => item === sItem.full)
                            ? "in-stock"
                            : "out-of-stock";
                        return (
                          <label
                            className={`product-size ${isInStock} ${
                              isInStock === "in-stock" &&
                              selectedSize === sItem.abbreviation
                                ? "selected"
                                : "not-selected"
                            }`}
                            key={sIndex}
                            onMouseEnter={() =>
                              setTooltipHover(sItem.abbreviation)
                            }
                            onMouseLeave={() => setTooltipHover("")}
                            onClick={() =>
                              handleSelectedVariants(
                                sItem.abbreviation,
                                isInStock,
                                setSelectedSize
                              )
                            }
                          >
                            <Tooltip
                              text={sItem.full}
                              isHovered={
                                isInStock === "in-stock" &&
                                sItem.abbreviation === tooltipHover
                              }
                            >
                              <input name="size-input" type="checkbox" />
                              <div className="size-box">
                                {sItem.abbreviation}
                              </div>
                            </Tooltip>
                          </label>
                        );
                      })}
                  </div>
                </div>
                <div className="product__card__dynamic__wrapper">
                  <div className="product__general__controls" onClick={() => setModal("size-guide")}>
                    Find your size <PiRuler />
                  </div>
                  <button className="product__cart__button-dark">
                    <HiOutlineShoppingCart />
                    <div>add to cart</div>
                  </button>
                  <div className="product__general__controls" onClick={() => setModal("shipping-exchanges-returns")}>
                    Shipping, Exchanges and Returns
                  </div>
                </div>
                <div className="product__card__toggles__wrapper">
                  <div
                    className={`${
                      optionsType === "description" && "selected"
                    } description__toggle`}
                    onClick={() => {
                      setOptionsType("description");
                    }}
                  >
                    <div className="description__text">Description</div>
                  </div>
                  <div
                    className={`${
                      optionsType === "composition" && "selected"
                    } composition__toggle`}
                    onClick={() => {
                      setOptionsType("composition");
                    }}
                  >
                    <div className="composition__text">
                      Composition & Care Guide
                    </div>
                  </div>
                  <div
                    className={`${
                      optionsType === "payment" && "selected"
                    } payment__toggle`}
                    onClick={() => {
                      setOptionsType("payment");
                    }}
                  >
                    <div className="payment__text">Payment Options</div>
                  </div>
                </div>
                <div className="product__card__info">
                  {optionsType === "description" && (
                    <>
                      <p>
                        {showMore
                          ? product.description
                          : product.description.substring(0, 250).concat("...")}
                      </p>
                      <button
                        className="show-more"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? (
                          <>
                            <span>Show less</span>
                            <AiOutlineMinus />
                          </>
                        ) : (
                          <>
                            <span>Show more</span>
                            <AiOutlinePlus />
                          </>
                        )}
                      </button>
                    </>
                  )}
                  {optionsType === "composition" && (
                    <div>
                      <li>{product.composition}</li>
                      <li>{product.care}</li>
                    </div>
                  )}
                  {optionsType === "payment" && (
                    <>
                      <p className="payment__options">
                        Bouge accepts the following forms of payment for online
                        purchases:
                      </p>
                      <div className="payment__grid">
                        <Mastercard />
                        <Visa />
                        <PayPal />
                      </div>
                      <p>
                        Please note that your credit card will be charged the
                        full transaction amount only after we've completed the
                        necessary steps, including verifying your card details,
                        obtaining credit authorization, confirming product
                        availability, and preparing your order for shipping.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal title="Size Guide" isActive={(modal==="size-guide" && true)} type="side" id="size-guide" setModal={setModal}>Yoo</Modal>
      <Modal title="Shipping, Exchanges and Returns" isActive={(modal==="shipping-exchanges-returns" && true)} type="side" id="shipping-exchanges-returns" setModal={setModal}>aa</Modal>
    </>
  );
};

export default Product;
