import EditableField from "./EditableField";
import styles from "./FileExplorer.module.scss";

function FileExplorer() {
    return (
        <div className={styles.main}>
            <div className={styles.topRow}>
                <div className={styles.zipFilename}>
                    <EditableField />
                </div>
                <div className={styles.menu}></div>
            </div>
            <div className={styles.tree}></div>
        </div>
    );
}

export default FileExplorer;
