import { supabase } from "../../utils/supabaseClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchApparel = createAsyncThunk(
  "apparel/fetchApparelData",
  async (categoryID) => {
    console.log(categoryID);
    const { data } = await supabase
      .from("apparel")
      .select("*")
      .eq("category_id", categoryID);

    return data;
  }
);

export const fetchCategoryBySlug = createAsyncThunk(
  "apparel/fetchCategoryBySlug",
  async (slug) => {
    const { data } = await supabase
      .from("category")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!data || !data.category_id) {
      return null;
    }

    return data.category_id;
  }
);

export const fetchSubcategoriesRecursive = createAsyncThunk(
  "apparel/fetchSubcategoriesRecursive",
  async (categoryID, {dispatch}) => {
    const { data } = await supabase
      .from("category")
      .select("category_id")
      .eq("parent_category_id", categoryID);

    if (!data || data.length === 0) {
        console.log(categoryID);
      return categoryID; //Return the category ID if it has no subcategories
    }

    for (const category of data) {
        console.log(dispatch(fetchApparel(dispatch(fetchSubcategoriesRecursive(category.category_id)))));
    }

  }
);
