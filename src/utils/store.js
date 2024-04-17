import { configureStore } from "@reduxjs/toolkit";
import apparelReducer from '../features/apparel/apparelSlice';
import pathReducer from '../features/path/pathSlice';

export const store = configureStore({
  reducer: {
    apparel: apparelReducer,
    path: pathReducer,
  },
});
