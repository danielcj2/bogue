import { supabase } from "../../utils/supabaseClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (productID) => {
    const { data } = await supabase
      .from("apparel")
      .select("*")
      .eq("hash", productID)
      .single();

    return data;
  }
);
