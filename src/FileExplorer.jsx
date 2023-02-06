import styles from "./FileExplorer.module.scss";
import ExplorerEntry from "./ExplorerEntry";

function FileExplorer({ fileTree, openFile }) {
    if (!fileTree.root) {
        return null;
    }
    return (
        <div className={styles.main}>
            {Object.values(fileTree.root.children).map((child) => (
                <ExplorerEntry
                    node={child}
                    key={child.name}
                    openFile={openFile}
                />
            ))}
        </div>
    );
}

export default FileExplorer;
