import { useState, useRef } from "react";
import JSZip from "jszip";

const createEntryShape = (name, isFolder) => ({
    name,
    ...(isFolder && { children: {} }),
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
                        level.children[subdir] = createEntryShape(subdir, true);
                    }
                }
                level = level.children[subdir];
            });
        });
        return tree;
    }

    async getFileContents(path) {
        return await this.zip.file(path).async("string");
    }

    writeToFile(path, contents) {
        console.log("Writing ", contents, "to file", path);
        this.zip.file(path, contents);
    }

    async downloadZip(filename) {
        const zip = await this.zip.generateAsync({ type: "blob" });
        console.log("Zip:", zip);

        const blobUrl = URL.createObjectURL(zip);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.dispatchEvent(
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
            })
        );

        document.body.removeChild(link);
    }
}

const useSimFilesystem = () => {
    const filesysRef = useRef(new SimFileSystem());
    const filesys = filesysRef.current;
    const [fileTree, setFileTree] = useState({ root: null });
    return {
        fileTree,
        loadZip: (file) => filesys.loadZip(file, setFileTree),
        getFileContents: (path) => filesys.getFileContents(path),
        writeToFile: (path, contents) => filesys.writeToFile(path, contents),
        downloadZip: (filename) => filesys.downloadZip(filename),
    };
};

export default useSimFilesystem;
