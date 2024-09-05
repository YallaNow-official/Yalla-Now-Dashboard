import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  userToken: localStorage.getItem('token') || "",
  decodedToken: null // Add a field to store the decoded token
};

const userTokenSlice = createSlice({
  name: "tokenSlice",
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.userToken = action.payload;
    if(state.userToken){
      localStorage.setItem('token', action.payload);
    }
    },
    decodeToken: (state, action) => {
      if (action.payload) {
        state.decodedToken = jwtDecode(action.payload);
      } else {
        state.decodedToken = null;
      }
    }
  },
});

export const { updateToken, decodeToken } = userTokenSlice.actions;
export const userTokenReducer = userTokenSlice.reducer;
