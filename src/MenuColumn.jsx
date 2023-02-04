import EditableField from "./EditableField";
import FileExplorer from "./FileExplorer";
import styles from "./MenuColumn.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

function MenuColumn() {
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
            <FileExplorer />
        </div>
    );
}

export default MenuColumn;
