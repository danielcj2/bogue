import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
    name: "popup",
    initialState: {
        message: "",
        type: null,
        isVisible: "",
    },
    reducers: {
        showPopup: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type || null;
            state.isVisible = true;
        },
        hidePopup: (state) => {
            state.message = "";
            state.type = null;
            state.isVisible = false;
        }
    }
});

export const { showPopup, hidePopup } = popupSlice.actions;

export default popupSlice.reducer;