import EditableField from "./EditableField";
import styles from "./FileExplorer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

function FileExplorer() {
    return (
        <div className={styles.main}>
            <div className={styles.topRow}>
                <div className={styles.zipFilename}>
                    <EditableField />
                </div>
                <div className={styles.menu}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
            </div>
            <div className={styles.tree}></div>
        </div>
    );
}

export default FileExplorer;
