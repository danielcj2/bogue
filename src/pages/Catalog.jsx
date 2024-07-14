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
import Notice from "../components/Notice";
import CategoryList from "../layout/CategoryList";
import DropdownSort from "../components/DropdownSort";
import DropdownFilter from "../components/DropdownFilter";
import Modal from "../components/Modal";

//layout
import AccessPortal from "../layout/AccessPortal";
import Header from "../layout/Header";

//icons
import { IoChevronDownSharp } from "react-icons/io5";
import { ReactComponent as IconDivider } from "../svgs/icon-divider.svg";

//hooks
import useHoverOutside from "../hooks/useHoverOutside";
import useClickOutside from "../hooks/useClickOutside";

//functions
import {
  displayCards,
  displayInfo,
  displayLinks,
} from "../functions/displayFunctions";

// import { selectApparelData } from "../features/apparel/apparelSlice";
import { selectSortedApparel } from "../functions/sortFunction";
import { setColor, setSize, setSortBy } from "../features/filters/filterSlice";
import CardCatalog from "../components/CardCatalog";

const Catalog = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.apparel);
  const { pData, pLoading } = useSelector((state) => state.path);

  const filteredData = useSelector(selectSortedApparel);
  const [toShow, setToShow] = useState(8);
  const handleLoadMore = () => {
    setToShow((prev) => prev + 8);
  };

  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  //onHover Dropdown
  const [optionsDropdown, setOptionsDropdown] = useState(false);
  const [optionsType, setOptionsType] = useState("");

  let optionsRef = useHoverOutside(() => {
    setOptionsDropdown(false);
  });

  //Filter or Sort Dropdown
  const handleButtonDropdown = (type) => {
    setOptionsDropdown(true);
    setOptionsType(type);
  };

  const [activeSort, setActiveSort] = useState(null);

  useEffect(() => {
    //reset # of apparels shown
    setToShow(8);

    // Fetch data from URL parameters and set it to the Redux store
    let colors = searchParams.get("color");
    let sizes = searchParams.get("size");
    let sortBy = searchParams.get("sortBy");

    //checkmark for current selected sorting logic
    setActiveSort(sortBy);

    if (colors) {
      dispatch(setColor(colors.split("%")));
    } else {
      //reset state
      dispatch(setColor([]));
    }
    if (sizes) {
      dispatch(setSize(sizes.split("%")));
    } else {
      //reset state
      dispatch(setSize([]));
    }
    dispatch(setSortBy(sortBy));
  }, [searchParams, dispatch]);

  useEffect(() => {
    //reset # of apparels shown
    setToShow(8);
    
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
  }, [slug, dispatch]);

  const [catalogExpanded, setCatalogExpanded] = useState(true);
  const [descriptionExpanded, setDescriptionExpanded] = useState(true);

  const toggleCatalogExpand = () => {
    setCatalogExpanded(!catalogExpanded);
  };
  const toggleDescriptionExpand = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  const [modal, setModal] = useState("");
  let modalRef = useClickOutside(() => {
    setModal("");
  });

  return (
    <>
      <Notice duplicate={9} />
      <Header setModal={setModal} />
      <div className="section">
        <div className="section__catalog">
          <div className="section__spacer"></div>
          <div className="catalog-content">
            <aside
              className={`catalog-nav ${
                catalogExpanded ? "expanded" : "not-expanded"
              }`}
            >
              <IconDivider onClick={toggleCatalogExpand} />
              {!catalogExpanded ? (
                <h1 className="vertical-text upp">Catalog Navigation</h1>
              ) : (
                <CategoryList />
              )}
            </aside>
            <div className="catalog">
              <div className="catalog__description">
                <IconDivider onClick={toggleDescriptionExpand} />
                {pLoading
                  ? "Loading..."
                  : pData && displayInfo(pData, descriptionExpanded)}
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
                    {pLoading ? "Loading..." : pData && displayLinks(pData)}
                  </div>
                  <ul className="catalog__list__filters__container">
                    <li className="product__count__container">
                      <div className="product__count__text">
                        {loading ? "0" : filteredData.length}
                      </div>
                      <div className="product__text">Product(s)</div>
                    </li>
                    <li
                      className="sort__button"
                      onMouseEnter={() => {
                        handleButtonDropdown("sort");
                      }}
                    >
                      <div className="sort__button__text">Sort by</div>
                      <IoChevronDownSharp />
                    </li>
                    <li
                      className="filter__button"
                      onMouseEnter={() => {
                        handleButtonDropdown("filter");
                      }}
                    >
                      <div className="filter__button__text">Filters</div>
                      <IoChevronDownSharp />
                    </li>
                  </ul>
                  <ul
                    className={`catalog__list__options__dropdown dropdown-long ${
                      optionsDropdown ? "active" : "inactive"
                    }`}
                  >
                    {optionsType === "sort" ? (
                      <DropdownSort active={activeSort} />
                    ) : (
                      <DropdownFilter />
                    )}
                  </ul>
                </div>
                <div className="catalog__list__cards">
                  {error && <p>404</p>}
                  {loading ? (
                    <p>Loading....</p>
                  ) : (
                    filteredData &&
                    filteredData
                      .slice(0, toShow)
                      .map((item) => (
                        <CardCatalog
                          key={`${item.apparel_name}_${item.category_id}`}
                          item={item}
                        />
                      ))
                  )}
                </div>
                <div className="cards__load-more__wrapper">
                  <div
                    className={`cards__load-more${
                      toShow > filteredData?.length ? " disabled" : ""
                    }`}
                    onClick={handleLoadMore}
                  >
                    Load More
                  </div>
                </div>
              </div>
            </div>
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
      </div>
    </>
  );
};

export default Catalog;
