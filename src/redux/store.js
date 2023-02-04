import { configureStore } from "@reduxjs/toolkit";
import panesReducer from "./slices/panesSlice";
import fileTreeReducer from "./slices/fileTreeSlice";

export default configureStore({
    reducer: {
        panes: panesReducer,
        fileTree: fileTreeReducer,
    },
});
