import { createSlice } from "@reduxjs/toolkit";
const initialState = { collpased: true };
export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setCollapsed: (state) => {
      state.collpased = !state.collpased;
      console.log(state);
    },
  },
});

export const { setCollapsed } = sidebarSlice.actions;
export default sidebarSlice.reducer;
