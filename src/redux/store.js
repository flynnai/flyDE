import { configureStore } from "@reduxjs/toolkit";
import panesReducer from "./slices/panesSlice";

export default configureStore({
    reducer: {
        panes: panesReducer,
    },
});