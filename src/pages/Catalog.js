import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { useParams } from "react-router-dom";

//components
import Header from "../components/Header";
import Settings from "../components/Settings";
import Notice from "../components/Notice";
import CatalogCard from "../components/CatalogCard";

//icons / imgs
import racksImg from "../imgs/warehouse-racks.jpg";
import { IoChevronDownSharp } from "react-icons/io5";
import {
  PiSquaresFour,
  PiSquare,
  PiSquareSplitHorizontal,
} from "react-icons/pi";

const Catalog = () => {
  const [error, setError] = useState(null);
  const [apparel, setApparel] = useState([]);
  const [pathLinks, setPathLinks] = useState([]);
  // const [loading, setLoading] = useState(true);
  var categories;

  const { slug } = useParams();
  // console.log(slug);
  // Parse parameters
  if (slug) {
    // categories = slug.split('/');
    // console.log(categories);
  }

  useEffect(() => {
    fetchCategoryID();
  }, []);

  const fetchCategoryID = async () => {
    try {
      const categoryID = await getCategoryIDBySlug(slug);
      if (!categoryID) {
        throw new Error("Category ID not found");
      }

      fetchBottomMostCategories(categoryID)
        .then(fetchCategoryDataSequentially)
        .catch((error) =>
          console.error("Error fetching bottom-most categories:", error.message)
        );

      setPathLinks(await fetchUpperMostCategories(categoryID, slug));
      console.log(pathLinks);
    } catch (error) {
      console.error("Error fetching category ID:", error.message);
    }
  };

  const getCategoryIDBySlug = async (slug) => {
    try {
      const { data: categoryData, error: categoryError } = await supabase
        .from("category")
        .select("*")
        .eq("slug", slug)
        .single();

      if (categoryError) {
        throw categoryError;
      }

      if (!categoryData || !categoryData.category_id) {
        return null;
      }

      return categoryData.category_id;
    } catch (error) {
      console.error("Error fetching category ID:", error.message);
      return null;
    }
  };

  const fetchBottomMostCategories = async (categoryID) => {
    try {
      const { data: childrenData, error: childrenError } = await supabase
        .from("category")
        .select("category_id")
        .eq("parent_category_id", categoryID);

      if (childrenError) {
        throw childrenError;
      }

      if (!childrenData || childrenData.length === 0) {
        return categoryID; // Return the category ID if it has no children
      }

      let categoryIDs = [];
      for (const category of childrenData) {
        categoryIDs = categoryIDs.concat(
          await fetchBottomMostCategories(category.category_id)
        );
      }
      return categoryIDs;
    } catch (error) {
      console.error("Error fetching children ID:", error.message);
      return [];
    }
  };

  /*BROKEN -- NEEDS FIX (HOW IT SHOULD WORK --> YOU GET A CATEGORY THEN CHECK FOR PARENT ID, IF NULL RETURN, IF NOT THEN RUN RECURSIVE FUNCTION) */
  const fetchUpperMostCategories = async (categoryID, categorySlug) => {
    try {
      const { data: parentData, error: parentError } = await supabase
        .from("category")
        .select("*")
        .eq("category_id", categoryID)
        .eq("slug", categorySlug)
        .single();

      if (parentError) {
        throw parentError;
      }

      if (!parentData || parentData.parent_category_id === null) {
        return categoryID; // Return the category ID if it has no parent
      }

      // fix 
      let categoryIDs = [];
      for (const category of parentData) {
        categoryIDs = categoryIDs.concat(
          await fetchUpperMostCategories(
            category.parent_category_id,
            category.slug
          )
        );
      }
      return categoryIDs;
    } catch (error) {
      console.error("Error fetching parent ID:", error.message);
      return [];
    }
  };

  const fetchCategoryDataSequentially = async (categoryIDs) => {
    if (categoryIDs.length) {
      let allApparelData = [];

      for (const categoryID of categoryIDs) {
        allApparelData = allApparelData.concat(
          await fetchApparelData(categoryID)
        );
      }
      setApparel(allApparelData);
    } else {
      setApparel(await fetchApparelData(categoryIDs));
    }
  };

  const fetchApparelData = async (categoryID) => {
    try {
      const { data: apparelData, error: apparelError } = await supabase
        .from("apparel")
        .select("*")
        .eq("category_id", categoryID);

      if (apparelError) {
        throw apparelError;
      }

      return apparelData;
    } catch (error) {
      console.error("Error fetching apparel data:", error.message);
    }
  };

  return (
    <>
      <Notice duplicate={9} />
      <Header />
      <div className="section">
        <div className="section__catalog">
          <img
            src={racksImg}
            className="background-img"
            alt="warehouse clothing racks"
            draggable="false"
          ></img>
          <div className="catalog__list">
            <div className="catalog__list__header__container">
              <div className="catalog__list__filters__button__container">
                <div className="filters__text">Filters </div>
                <IoChevronDownSharp />
              </div>
              <div className="catalog__list__path">
                Shop All / Ready-To-Wear / Shirts
              </div>
              <div className="catalog__list__toggle__container">
                <div className="toggle__large">
                  <PiSquare className="__button" />
                </div>
                <div className="toggle__medium">
                  <PiSquareSplitHorizontal className="__button" />
                </div>
                <div className="toggle__small">
                  <PiSquaresFour className="__button" />
                </div>
              </div>
            </div>
            <div className="catalog__list__cards">
              {error && <p>404</p>}
              {apparel &&
                apparel.map((item) => (
                  <CatalogCard key={item.apparel_id} item={item} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
