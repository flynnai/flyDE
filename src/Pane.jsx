import { useState } from "react";
import styles from "./Pane.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFile } from "@fortawesome/free-solid-svg-icons";

function Pane({ path, pane, initOffset }) {
    const [offset, setOffset] = useState({ x: initOffset.x, y: initOffset.y });
    // useEffect(() => {
    //     const dragHandle = dragHandleRef.current;
    //     const dragWrapper = dragWrapperRef.current;
    //     if (dragHandle && dragWrapper) {
    //         let isResizing = false;

    //         const mouseDown = () => (isResizing = true);
    //         const mouseUp = () => (isResizing = false);

    //         dragHandle.addEventListener("mousedown", mouseDown);
    //         document.addEventListener("mouseup", mouseUp);

    //         const mouseMove = (e) => {
    //             if (isResizing) {
    //                 let newWidth = e.clientX - dragWrapper.offsetLeft;
    //                 newWidth = Math.max(
    //                     70,
    //                     Math.min(newWidth, window.innerWidth / 2)
    //                 );
    //                 setMenuWidth(newWidth);
    //             }
    //         };

    //         document.addEventListener("mousemove", mouseMove);
    //         return () => {
    //             dragHandle.removeEventListener("mousedown", mouseDown);
    //             document.removeEventListener("mouseup", mouseUp);
    //             document.removeEventListener("mousemove", mouseMove);
    //         };
    //     }
    // }, []);

    const contents = JSON.stringify(pane, null, 2);

    return (
        <div className={styles.main} style={{ left: offset.x, top: offset.y }}>
            <div className={styles.header}>
                <div className={styles.filename}>
                    <FontAwesomeIcon icon={faFile} />
                    &nbsp;
                    {pane.name}
                </div>
                <FontAwesomeIcon icon={faXmark} />
            </div>
            <pre className={styles.fileContents}>
                {contents.split("\n").map((line) => (
                    <span>{line}</span>
                ))}
            </pre>
        </div>
    );
}

export default Pane;
