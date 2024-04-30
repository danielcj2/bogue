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
import {
  fetchParentCategories,
  fetchDefaultPath,
} from "../features/path/pathAsyncThunks";

//components
import Header from "../components/Header";
import Notice from "../components/Notice";

//icons
import { IoChevronDownSharp } from "react-icons/io5";
import { ReactComponent as IconDivider } from "../svgs/icon-divider.svg";

//hooks
import useClickOutside from "../hooks/useClickOutside";
import CategoryList from "../components/CategoryList";

//functions
import { displayCards, displayInfo, displayLinks } from "../functions/displayFunctions";

import { selectApparelData } from "../features/apparel/apparelSlice";

const Catalog = () => {
  console.log(useSelector(selectApparelData));

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.apparel);
  const { pData, pLoading } = useSelector((state) => state.path);

  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  //change to hover Outside
  const [optionsDropdown, setOptionsDropdown] = useState(false);

  let optionsRef = useClickOutside(() => {
    setOptionsDropdown(false);
  });


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

  // const sortApparel = () => {
  //   const currentParams = Object.fromEntries([...searchParams]) || "default";

  //   switch (currentParams.sort) {
  //     case "asc":
  //       data = data.sort((a, b) => a.cost - b.cost);
  //       break;
  //     case "desc":
  //       data = data.sort((a, b) => b.cost - a.cost);
  //       break;
  //     case "new":
  //       data = data.filter((a) => a.is_new_arrival === true);
  //       break;
  //     default:
  //       //Do nothing
  //       break;
  //   }
  // };

  return (
    <>
      <Notice duplicate={9} />
      <Header />
      <div className="section">
        <div className="section__catalog">
          <div className="section__spacer"></div>
          <div className="catalog-content">
            <aside className="catalog-nav">
              <IconDivider />
              <CategoryList />
            </aside>
            <div className="catalog">
              <div className="catalog__description">
                <IconDivider />
                {pLoading ? "" : pData && displayInfo(pData)}
              </div>
              <div className="catalog__list">
                <div
                  className="catalog__list__header__container"
                  ref={optionsRef}
                >
                  <div className="catalog__list__path">
                    <div>
                      <Link to="/">Home</Link>
                    </div>
                    {pLoading ? "" : pData && displayLinks(pData)}
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
                      <div
                        className="filter__button__text"
                      >
                        Filters
                      </div>
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
        </div>
      </div>
    </>
  );
};

export default Catalog;
