import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice.js";
import themeModeSlice from "./features/themeModeSlice.js";
import globalLoadingSlice from "./features/globalLoadingSlice.js";
import appStateSlice from "./features/appStateSlice.js";
import authModelSlice from "./features/authModelSlice.js";
import bookingModalSlice from "./features/bookingModalSlice.js";

const store = configureStore({
    reducer: {
        user: userSlice,
        themeMode: themeModeSlice,
        authModal: authModelSlice,
        globalLoading: globalLoadingSlice,
        appState: appStateSlice,
        bookingModal: bookingModalSlice,
    }
});

export default store;
