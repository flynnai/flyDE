import styles from "./FileExplorer.module.scss";
import ExplorerEntry from "./ExplorerEntry";

function FileExplorer({ fileTree, openFile }) {
    if (!fileTree.root) {
        return null;
    }
    return (
        <div className={styles.main}>
            <ExplorerEntry node={fileTree.root} openFile={openFile} />
        </div>
    );
}

export default FileExplorer;
