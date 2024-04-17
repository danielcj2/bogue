import { supabase } from "../../utils/supabaseClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchApparel = createAsyncThunk(
  "apparel/fetchApparelData",
  async (categoryIDs) => {
    if (categoryIDs.payload.length) {
      const ids = categoryIDs.payload.map((category) => category.category_id);

      let allApparelData = [];

      for (const category of ids) {
        const { data } = await supabase
          .from("apparel")
          .select("*")
          .eq("category_id", category);

        allApparelData.push(...data);
      }
      return allApparelData;
    } else {
      const { data } = await supabase
        .from("apparel")
        .select("*")
        .eq("category_id", categoryIDs.payload);

      return data;
    }
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

export const fetchSubcategories = createAsyncThunk(
  "apparel/fetchSubcategories",
  async (categoryID) => {
    const allDescendants = await fetchAllDescendants(categoryID);

    if (allDescendants.length === 0) {
      return categoryID;
    } else {
      return allDescendants;
    }
  }
);

const fetchAllDescendants = async (categoryID) => {
  let allDescendants = [];
  const { data } = await supabase
    .from("category")
    .select("category_id")
    .eq("parent_category_id", categoryID);

  for (const subcategory of data) {
    allDescendants.push(subcategory);
    const descendants = await fetchAllDescendants(subcategory.category_id);
    allDescendants.push(...descendants);
  }

  return allDescendants;
};

export const fetchDefaultApparel = createAsyncThunk(
  "apparel/fetchDefaultApparel",
  async () => {
    const { data } = await supabase.from("apparel").select("*");
    return data;
  }
);
