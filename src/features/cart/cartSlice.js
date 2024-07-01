import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  quantity: 0,
  total: 0,
  isLoading: false,
  error: null,
};

const simulateAsyncOperation = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (payload) => {
    await simulateAsyncOperation();
    return payload;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItemFromCart: (state, action) => {
      const toRemove = action.payload;
      const existingItem = state.items.find(
        (item) => item.apparel_id === toRemove
      );

      if (existingItem) {
        state.items = state.items.filter(
          (item) => item.apparel_id !== toRemove
        );

        state.quantity -= existingItem.quantity;
        state.total -= existingItem.quantity * existingItem.cost;
      } else {
        state.error = "Item does not exist.";
      }
    },
    increaseQuantity: (state, action) => {
      const toIncrease = action.payload;
      const existingItem = state.items.find(
        (item) => item.apparel_id === toIncrease
      );

      if (existingItem) {
        existingItem.quantity++;
        state.total++;
        state.total += existingItem.cost;
      }
    },
    decreaseQuantity: (state, action) => {
      const toDecrease = action.payload;
      const existingItem = state.items.find(
        (item) => item.apparel_id === toDecrease
      );

      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.apparel_id !== toDecrease
          );
        } else {
          existingItem.quantity--;
        }

        state.total--;
        state.total -= existingItem.cost;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.quantity = 0;
      state.total = 0;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        const toAdd = action.payload;
        const existingItem = state.items.find(
          (item) => item.apparel_id === toAdd.apparel_id
        );

        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.items.push({ ...toAdd, quantity: 1 });
        }

        state.quantity++;
        state.total += toAdd.cost;
        state.isLoading = false;
      });
  },
});

export const { removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
