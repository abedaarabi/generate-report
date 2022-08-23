import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: {},
};

export const xlsxSlice = createSlice({
  name: "excelData",
  initialState,
  reducers: {
    increment: (state, action) => {
      console.log(action);

      state.date = action;
    },
  },
});

export const { increment } = xlsxSlice.actions;

export default xlsxSlice.reducer;
