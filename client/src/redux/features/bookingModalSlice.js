import { createSlice } from "@reduxjs/toolkit";

export const bookingModalSlice = createSlice({
  name: "bookingModal",
  initialState: {
    bookingModalOpen: false,
  },
  reducers: {
    setBookingModalOpen: (state, action) => {
      state.bookingModalOpen = action.payload;
    },
  },
});

export const { setBookingModalOpen } = bookingModalSlice.actions;

export const selectBookingModalOpen = (state) => state.bookingModal.bookingModalOpen;

export default bookingModalSlice.reducer;
