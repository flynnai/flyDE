import styles from "./FileExplorer.module.scss";
import ExplorerEntry from "./ExplorerEntry";

class DirNode {
    constructor(name) {
        this.name = name;
        this.children = {};
    }

    exists(name) {
        return name in this.children;
    }

    addNode(name, entry) {
        this.children[name] = entry;
    }

    getNode(name) {
        return this.children[name];
    }

    getChildren() {
        return Object.values(this.children);
    }
}

const addToTree = (tree, relativePath, entry) => {
    if (entry.dir) {
        relativePath = relativePath.slice(0, -1);
    }
    const splitPath = relativePath.split("/");
    let level = tree;
    splitPath.forEach((subdir, i) => {
        let isLast = i === splitPath.length - 1;
        if (isLast && !entry.dir) {
            level.addNode(subdir, entry);
        } else {
            if (!level.exists(subdir)) {
                level.addNode(subdir, new DirNode(subdir));
            }
        }
        level = level.getNode(subdir);
    });
};

function FileExplorer({ zip }) {
    // create a hierarchical, traversable structure from path list
    const tree = new DirNode("root");
    zip.forEach((relativePath, entry) => addToTree(tree, relativePath, entry));

    return (
        <div className={styles.main}>
            <ExplorerEntry node={tree} />
        </div>
    );
}

export { DirNode };
export default FileExplorer;
