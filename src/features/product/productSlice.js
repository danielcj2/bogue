import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "./productAsyncThunks";

const initialState = {
  product: [],
  filters: {
    color: "",
    size: "",
  },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    }).addCase(fetchProduct.rejected, (state, error) => {
      state.loading = false;
      state.error = "Error fetching product data: " + error;
    }).addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false; 
    })
  },
});

export default productSlice.reducer;
