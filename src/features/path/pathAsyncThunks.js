import { supabase } from "../../utils/supabaseClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchParentCategories = createAsyncThunk(
  "path/fetchParentCategories",
  async (categoryID) => {
    const allAncestors = await fetchAllAncestors(categoryID);
    return allAncestors;
  }
);

const fetchAllAncestors = async (categoryID) => {
  let allAncestors = [];
  const { data } = await supabase
    .from("category")
    .select("*")
    .eq("category_id", categoryID)
    .single();

  if (data.parent_category_id === null) {
    return data;
  }

  allAncestors.push(data);
  const ancestors = await fetchAllAncestors(data.parent_category_id);
  allAncestors.push(ancestors);

  return allAncestors;
};

export const fetchDefaultPath = createAsyncThunk(
  "path/fetchDefaultPath",
  async () => {
    return {
      category_name: "Ready To Wear",
      category_description:
        "Discover the ease and elegance of ready-to-wear fashion! Our curated collection offers versatile styles for every occasion, crafted with quality and attention to detail. Elevate your wardrobe effortlessly with our range of chic, trendsetting designs. Shop now and step into style with confidence!",
        slug: "",
    };
  }
);
