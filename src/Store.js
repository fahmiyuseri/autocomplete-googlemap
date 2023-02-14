import { configureStore } from "@reduxjs/toolkit";
import autoSuggestPlaceSlice from "./slices/autoSuggestPlaceSlice";


export default configureStore({
    reducer: {
        autoSuggestPlaceSlice: autoSuggestPlaceSlice,
    },
});
