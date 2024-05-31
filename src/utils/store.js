import { configureStore } from "@reduxjs/toolkit";
import apparelReducer from '../features/apparel/apparelSlice';
import pathReducer from '../features/path/pathSlice';
import filterReducer from '../features/filters/filterSlice';
import productReducer from '../features/product/productSlice';
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    apparel: apparelReducer,
    path: pathReducer,
    filters: filterReducer,
    product: productReducer,
    auth: authReducer,
  },
});
