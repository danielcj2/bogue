import { configureStore } from "@reduxjs/toolkit";
import apparelReducer from '../features/apparel/apparelSlice';

export const store = configureStore({
  reducer: {
    apparel: apparelReducer,
  },
});
