import { useRef, useState } from "react";
import EditableField from "./EditableField";
// import FileExplorer from "./FileExplorer";
import styles from "./MenuColumn.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import JSZip from "jszip";
import { loadZipFile } from "./redux/slices/fileTreeSlice";
import { useDispatch, useSelector } from "react-redux";

function MenuColumn() {
    const dispatch = useDispatch();
    const fileTree = useSelector((state) => state.fileTree);
    const handleFileUpload = async (e) => {
        if (!e.target.files.length) {
            // TODO cleanup other files
            return;
        }
        const file = e.target.files[0];
        const fileToBlob = async (file) =>
            new Blob([new Uint8Array(await file.arrayBuffer())], {
                type: file.type,
            });
        dispatch(loadZipFile({ file: await fileToBlob(file) }));
    };

    console.log("File tree:", fileTree);
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
            <input type="file" onChange={handleFileUpload} />
            {/* <FileExplorer /> */}
        </div>
    );
}

export default MenuColumn;
