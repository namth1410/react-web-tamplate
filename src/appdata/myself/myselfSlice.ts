import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Nullable } from "types/common";
import { Me } from "types/userTypes";
import axiosInstance from "utils/api";

interface MyselfState {
  me: Nullable<Me>;
}

const initialState: MyselfState = {
  me: null,
};

export const myselfSlice = createSlice({
  name: "me",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state, action) => {})
      .addCase(getMe.fulfilled, (state, action) => {})
      .addCase(getMe.rejected, (state, action) => {});
  },
});

const getMe = createAsyncThunk<Me, void>("me/me", async () => {
  try {
    const respone = await axiosInstance.get(`/me`);
    return respone.data;
  } catch (error) {
    throw new Error("An unknown error occurred");
  }
});

export { getMe };
export default myselfSlice.reducer;
