import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApparel,
  fetchCategoryBySlug,
  fetchSubcategories,
  fetchDefaultApparel,
} from "../features/apparel/apparelAsyncThunks";
import { fetchParentCategories, fetchDefaultPath } from "../features/path/pathAsyncThunks";

//components
import Header from "../components/Header";
import Notice from "../components/Notice";
import CatalogCard from "../components/CatalogCard";

//icons
import { IoChevronDownSharp } from "react-icons/io5";
import { ReactComponent as IconDivider } from "../svgs/icon-divider.svg";

//hooks
import useClickOutside from "../hooks/useClickOutside";

const Catalog = () => {
  const [paramsData, setParamsData] = useState([]);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.apparel);
  const { pData, pLoading, pError } = useSelector((state) => state.path);

  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  useEffect(() => {
    if (slug === undefined) {
      dispatch(fetchDefaultPath());
      dispatch(fetchDefaultApparel());
    } else {
      dispatch(fetchCategoryBySlug(slug))
        .unwrap()
        .then((categoryID) => {
          return dispatch(fetchParentCategories(categoryID));
        })
        .catch((error) => {
          console.error("Error fetching path: ", error);
        });

      dispatch(fetchCategoryBySlug(slug))
        .unwrap()
        .then((categoryID) => {
          return dispatch(fetchSubcategories(categoryID));
        })
        .then((categoryIDs) => {
          return dispatch(fetchApparel(categoryIDs));
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [slug]);


  const sortApparel = async (apparelData) => {
    const currentParams = Object.fromEntries([...searchParams]) || "default";

    switch (currentParams.sort) {
      case "asc":
        apparelData = apparelData.sort((a, b) => a.cost - b.cost);
        break;
      case "desc":
        apparelData = apparelData.sort((a, b) => b.cost - a.cost);
        break;
      case "new":
        apparelData = apparelData.filter((a) => a.is_new_arrival === true);
        break;
      default:
        //Do nothing
        break;
    }
  };

  const displayLinks = (pData) => {
    if (Array.isArray(pData)) {
      let linkEntries = [];
      let pathLinks = "";
      for (var i = pData.length - 1; i >= 0; i--) {
        linkEntries.push(
          <div key={pData[i].category_id}>
            <Link to={"/catalog/" + pathLinks + pData[i].slug}>
              {pData[i].category_name}
            </Link>
          </div>
        );
        pathLinks = pathLinks + pData[i].slug + "/";
      }

      return linkEntries;
    } else {
      return (
        <div key={pData.category_id}>
          <Link to={"/catalog/" + pData.slug}>{pData.category_name}</Link>
        </div>
      );
    }
  };

  const displayCards = (data) => {
    let cardEntries = [];
    for (var i = 0; i < data.length; i++) {
      cardEntries.push(
        <CatalogCard
          key={`${data[i].apparel_name}_${data[i].category_id}`}
          item={data[i]}
        />
      );
    }

    return cardEntries;
  };

  //change to hover Outside
  const [optionsDropdown, setOptionsDropdown] = useState(false);

  let optionsRef = useClickOutside(() => {
    setOptionsDropdown(false);
  });

  return (
    <>
      <Notice duplicate={9} />
      <Header />
      <div className="section">
        <div className="section__catalog">
          <div className="section__spacer"></div>
          <div className="catalog__description">
            <IconDivider />
            <h2 className="catalog__description__title upp">
              Men's {paramsData.category_name}
            </h2>
            <p className="catalog__description__text">
              {paramsData.category_description}
            </p>
          </div>
          <div className="catalog__list">
            <div className="catalog__list__header__container" ref={optionsRef}>
              <div className="catalog__list__path">
                <div>
                  <Link to="/">Home</Link>
                </div>
                {pLoading ? "" : displayLinks(pData)}
              </div>
              <ul className="catalog__list__filters__container">
                <li className="product__container">
                  <div className="product__count">
                    {loading ? "0" : data.length}
                  </div>
                  <div className="product__text">Product(s)</div>
                </li>
                <li
                  className="sort__button"
                  onClick={() => {
                    setOptionsDropdown(!optionsDropdown);
                  }}
                >
                  <div className="sort__button__text">Sort by</div>
                  <IoChevronDownSharp />
                </li>
                <li className="filter__button">
                  <div className="filter__button__text">Filters</div>
                  <IoChevronDownSharp />
                </li>
              </ul>
              <ul
                className={`catalog__list__options__dropdown dropdown-long ${
                  optionsDropdown ? "active" : "inactive"
                }`}
              >
                <li className="sort__normal">
                  <Link to="?">Recommended</Link>
                </li>
                <li className="sort__high-low">
                  <Link to="?sort=desc">Price - High to Low</Link>
                </li>
                <li className="sort__low-high">
                  <Link to="?sort=asc">Price - Low to High</Link>
                </li>
                <li className="sort__new">
                  <Link to="?sort=new">New In</Link>
                </li>
              </ul>
            </div>
            <div className="catalog__list__cards">
              {error && <p>404</p>}
              {loading ? <p>Loading....</p> : data && displayCards(data)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
