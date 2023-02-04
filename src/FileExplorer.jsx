import styles from "./FileExplorer.module.scss";
import ExplorerEntry from "./ExplorerEntry";

function FileExplorer({ fileTree }) {
    if (!fileTree.root) {
        return null;
    }
    return (
        <div className={styles.main}>
            <ExplorerEntry node={fileTree.root} />
        </div>
    );
}

export default FileExplorer;
