// import { spinnerReducer } from "./spinnerSlice";
import {  userTokenReducer } from "./userTokenSlice";
import { configureStore } from "@reduxjs/toolkit";

export const globalStore = configureStore({
  reducer: {
    token : userTokenReducer,

    // fetching:spinnerReducer
  },
});
