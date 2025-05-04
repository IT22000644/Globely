import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
