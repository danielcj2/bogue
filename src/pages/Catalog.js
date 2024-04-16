import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { Link, useParams, useSearchParams } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApparel,
  fetchCategoryBySlug,
  fetchSubcategoriesRecursive,
} from "../features/apparel/apparelAsyncThunks";

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
  const [apparel, setApparel] = useState([]);
  const [pathLinks, setPathLinks] = useState([]);
  const [paramsData, setParamsData] = useState([]);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.apparel);

  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  useEffect(() => {
    if (slug === undefined) {
      setPathLinks([]);
      setParamsData({
        category_name: "Ready To Wear",
        category_description:
          "Discover the ease and elegance of ready-to-wear fashion! Our curated collection offers versatile styles for every occasion, crafted with quality and attention to detail. Elevate your wardrobe effortlessly with our range of chic, trendsetting designs. Shop now and step into style with confidence!",
      });
      defaultPath();
    } else {
      dispatch(fetchCategoryBySlug(slug))
        .unwrap()
        .then((categoryID) => {
          return dispatch(fetchSubcategoriesRecursive(categoryID));
        })
        // .then((categoryID) => {
        //   return dispatch(fetchApparel(categoryID));
        // })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });

      setApparel(data);
    }
    displayLinks();
  }, []);

  const defaultPath = async () => {
    try {
      const { data, error } = await supabase.from("apparel").select("*");

      if (error) {
        throw error;
      }

      sortApparel(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  // const fetchCategoryData = async () => {
  //   try {
  //     const categoryID = await getCategoryIDBySlug(slug);
  //     if (!categoryID) {
  //       throw new Error("Category ID not found");
  //     }

  //     fetchBottomMostCategories(categoryID)
  //       .then(fetchDataSequentially)
  //       .catch((error) =>
  //         console.error("Error fetching bottom-most categories:", error.message)
  //       );

  //     setPathLinks(await fetchUpperMostCategories(categoryID));
  //   } catch (error) {
  //     console.error("Error fetching category ID:", error.message);
  //   }
  // };

  // const fetchBottomMostCategories = async (categoryID) => {
  //   try {
  //     const { data: childrenData, error: childrenError } = await supabase
  //       .from("category")
  //       .select("category_id")
  //       .eq("parent_category_id", categoryID);

  //     if (childrenError) {
  //       throw childrenError;
  //     }

  //     if (!childrenData || childrenData.length === 0) {
  //       return categoryID; // Return the category ID if it has no children
  //     }

  //     let categoryIDs = [];
  //     for (const category of childrenData) {
  //       categoryIDs = categoryIDs.concat(
  //         await fetchBottomMostCategories(category.category_id)
  //       );
  //     }
  //     return categoryIDs;
  //   } catch (error) {
  //     console.error("Error fetching children ID:", error.message);
  //     return [];
  //   }
  // };

  const fetchUpperMostCategories = async (categoryID) => {
    try {
      const { data: parentData, error: parentError } = await supabase
        .from("category")
        .select("*")
        .eq("category_id", categoryID)
        .single();

      if (parentError) {
        throw parentError;
      }

      if (!parentData || parentData.parent_category_id === null) {
        return parentData; // Return data if it has no parent
      }

      let parentContainer = [];
      parentContainer = parentContainer.concat(
        await fetchUpperMostCategories(parentData.parent_category_id)
      );

      return parentContainer;
    } catch (error) {
      console.error("Error fetching parent ID:", error.message);
      return [];
    }
  };

  // const fetchDataSequentially = async (categoryIDs) => {
  //   if (categoryIDs.length) {
  //     let allApparelData = [];

  //     for (const categoryID of categoryIDs) {
  //       allApparelData = allApparelData.concat(
  //         await fetchApparelData(categoryID)
  //       );
  //     }

  //     sortApparel(allApparelData);
  //   } else {
  //     sortApparel(await fetchApparelData(categoryIDs));
  //   }
  // };

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

    setApparel(apparelData);
  };

  const displayLinks = () => {
    let linkEntries = [];
    for (var i = 0; i < pathLinks.length; i++) {
      linkEntries.push(
        <div key={pathLinks[i].category_id}>
          <Link to={"/catalog/" + pathLinks[i].slug}>
            {pathLinks[i].category_name}
          </Link>
        </div>
      );
    }

    return linkEntries;
  };

  const displayCards = (data) => {
    let cardEntries = [];
    for (var i = 0; i < data.length; i++) {
      cardEntries.push(
        <CatalogCard key={data[i].category_id} item={data[i]} />
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
                {displayLinks()}
                <div>
                  <Link className="current-path">
                    {paramsData.category_name}
                  </Link>
                </div>
              </div>
              <ul className="catalog__list__filters__container">
                <li className="product__container">
                  <div className="product__count">{loading && "0"}</div>
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
