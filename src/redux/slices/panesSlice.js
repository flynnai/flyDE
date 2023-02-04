import { createSlice } from "@reduxjs/toolkit";

const createPaneShape = (text) => ({
    text,
    isDirty: false,
});

export const panesSlice = createSlice({
    name: "panes",
    initialState: {},
    reducers: {
        // each uses "immer" under the hood
        createPane: (state, action) => {
            const { path, text } = action;
            state[path] = createPaneShape(text);
        },
        updateText: (state, action) => {
            const { path, newText } = action.payload;
            const pane = state[path];
            pane.text = newText;
        },
        keyDown: (state, action) => {
            const { path, key, metaKey, shiftKey, altKey } = action;
            const pane = state[path];
            // todo todo todo...
        },
    },
});

export const { cellClick, keyDown } = panesSlice.actions;

export default panesSlice.reducer;
