import { useState, useRef } from "react";
import JSZip from "jszip";

const createEntryShape = (name, isFolder) => ({
    name,
    ...(isFolder && { children: [] }),
});

// each of these methods operates on the JSZip underlying object, and
// also fileTree state. The two should mirror each other identically after any of them are called.
class SimFileSystem {
    constructor() {
        this.zip = null;
    }

    async loadZip(file, setFileTree) {
        // load file into JSZip
        this.zip = await JSZip.loadAsync(file);
        setFileTree({ root: this.#constructTree() });
    }

    #constructTree() {
        // turn JSZip file list into hierarchical structure
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

const useSimFilesystem = () => {
    const filesysRef = useRef(new SimFileSystem());
    const filesys = filesysRef.current;
    const [fileTree, setFileTree] = useState({ root: null });
    return {
        fileTree,
        loadZip: (file) => filesys.loadZip(file, setFileTree),
    };
};

export default useSimFilesystem;
