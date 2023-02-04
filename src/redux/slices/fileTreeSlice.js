import { createSlice } from "@reduxjs/toolkit";
import JSZip from "jszip";

const createEntryShape = (name, isFolder) => ({
    name,
    ...(isFolder && { children: [] }),
});

// each of these methods operates on the JSZip underlying object, and
// also Redux state. The two should mirror each other identically after any of them are called.
class SimFileSystem {
    constructor() {
        this.zip = null;
    }

    async loadZip(file, reduxState) {
        // load file into JSZip
        this.zip = await JSZip.loadAsync(file);
        reduxState.root = this.#constructTree();
    }

    #constructTree() {
        // turn JSZip file list into hierarchical Redux structure
        const tree = createEntryShape("/", true);
        this.zip.forEach((relativePath, entry) => {
            if (entry.dir) {
                relativePath = relativePath.slice(0, -1); // cut off '/'
            }
            const splitPath = relativePath.split("/");
            let level = tree;
            splitPath.forEach((subdir, i) => {
                let isLast = i === splitPath.length - 1;
                if (isLast && !entry.dir) {
                    level.children[subdir] = createEntryShape(
                        entry.name,
                        false
                    );
                } else {
                    if (!(subdir in level.children)) {
                        level[subdir] = createEntryShape(subdir, true);
                    }
                }
                level = level[subdir];
            });
        });
        return tree;
    }
}

const filesys = new SimFileSystem();

export const fileTreeSlice = createSlice({
    name: "fileTree",
    initialState: {
        root: null,
    },
    reducers: {
        // each uses "immer" under the hood
        loadZipFile: (state, action) => {
            const { file } = action;
            console.log("File is ", file);
            filesys.loadZip(file, state);
        },
    },
});

export const { loadZipFile } = fileTreeSlice.actions;

export default fileTreeSlice.reducer;
