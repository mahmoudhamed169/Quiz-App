import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userInfo {
  value: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    role: string;
  };
}
const initialState: userInfo = {
  value: {
    _id: "",
    first_name: "",
    last_name: "",
    email: "",
    status: "",
    role: "",
  },
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
