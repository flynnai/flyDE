import EditableField from "./EditableField";
import FileExplorer from "./FileExplorer";
import styles from "./MenuColumn.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

function MenuColumn({ fileTree, loadZip, openFile, downloadZip }) {
    const [hasUploaded, setHasUploaded] = useState(false);
    const [menuWidth, setMenuWidth] = useState(null);
    const dragHandleRef = useRef(null);
    const dragWrapperRef = useRef(null);
    const fileInputRef = useRef(null);
    const handleFileUpload = async (e) => {
        if (!e.target.files.length) {
            // TODO cleanup other files
            return;
        }
        const file = e.target.files[0];
        await loadZip(file);
        setHasUploaded(true);
    };

    useEffect(() => {
        const dragHandle = dragHandleRef.current;
        const dragWrapper = dragWrapperRef.current;
        if (dragHandle && dragWrapper) {
            let isResizing = false;

            const mouseDown = () => (isResizing = true);
            const mouseUp = () => (isResizing = false);

            dragHandle.addEventListener("mousedown", mouseDown);
            document.addEventListener("mouseup", mouseUp);

            const mouseMove = (e) => {
                if (isResizing) {
                    let newWidth = e.clientX - dragWrapper.offsetLeft;
                    newWidth = Math.max(
                        70,
                        Math.min(newWidth, window.innerWidth / 2)
                    );
                    setMenuWidth(newWidth);
                }
            };

            document.addEventListener("mousemove", mouseMove);
            return () => {
                dragHandle.removeEventListener("mousedown", mouseDown);
                document.removeEventListener("mouseup", mouseUp);
                document.removeEventListener("mousemove", mouseMove);
            };
        }
    }, []);

    return (
        <div
            className={styles.main}
            style={menuWidth !== null ? { width: `${menuWidth}px` } : {}}
        >
            <div className={styles.dragWrapper} ref={dragWrapperRef}>
                <div className={styles.topRow}>
                    <div className={styles.zipFilename}>
                        <EditableField />
                    </div>
                    <div
                        className={styles.menu}
                        onClick={() => downloadZip("NEW FILENAME HERE")}
                    >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </div>
                {!hasUploaded && (
                    <div className={styles.uploadWrapper}>
                        <input
                            type="file"
                            accept=".zip"
                            onChange={handleFileUpload}
                            className={styles.fileInput}
                            ref={fileInputRef}
                        />
                        <button
                            className={styles.uploadFile}
                            onClick={() => fileInputRef.current.click()}
                        >
                            Upload .zip File
                        </button>
                    </div>
                )}
                <FileExplorer fileTree={fileTree} openFile={openFile} />
            </div>
            <div className={styles.dragHandle} ref={dragHandleRef}>
                &nbsp;
            </div>
        </div>
    );
}

export default MenuColumn;
