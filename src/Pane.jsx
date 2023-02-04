import { useEffect, useRef, useState } from "react";
import styles from "./Pane.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFile } from "@fortawesome/free-solid-svg-icons";
import { joinClasses } from "./utils";

const getFilename = (path) => {
    let splitPath = path.split("/");
    return splitPath[splitPath.length - 1];
};

function Pane({ path, pane, initOffset, paneContainerRef }) {
    const [offset, setOffset] = useState({ x: initOffset.x, y: initOffset.y });
    const [movingOffset, setMovingOffset] = useState({ x: 0, y: 0 });
    const paneRef = useRef(null);
    const paneHeaderRef = useRef(null);

    const filename = getFilename(path);

    // moveable panes logic
    useEffect(() => {
        const paneElt = paneRef.current;
        const paneHeader = paneHeaderRef.current;
        const pageContainer = paneContainerRef.current;
        if (paneElt && paneHeader && pageContainer) {
            let startPos = null;

            const mouseDown = (e) => {
                startPos = {
                    x: e.clientX,
                    y: e.clientY,
                };
            };
            const mouseUp = (e) => {
                if (startPos) {
                    let diffX = e.clientX - startPos.x;
                    let diffY = e.clientY - startPos.y;
                    setMovingOffset({ x: 0, y: 0 });
                    setOffset(({ x, y }) => ({
                        x: Math.max(x + diffX, 0),
                        y: Math.max(y + diffY, 0),
                    }));
                    startPos = null;
                }
            };

            const mouseMove = (e) => {
                if (startPos) {
                    let diffX = e.clientX - startPos.x;
                    let diffY = e.clientY - startPos.y;
                    diffX = Math.max(-offset.x, diffX);
                    diffY = Math.max(-offset.y, diffY);
                    setMovingOffset({ x: diffX, y: diffY });
                }
            };

            paneHeader.addEventListener("mousedown", mouseDown);
            document.addEventListener("mouseup", mouseUp);
            document.addEventListener("mousemove", mouseMove);
            return () => {
                paneHeader.removeEventListener("mousedown", mouseDown);
                document.removeEventListener("mouseup", mouseUp);
                document.removeEventListener("mousemove", mouseMove);
            };
        }
    }, [offset]);

    const contents = JSON.stringify(pane, null, 2);

    return (
        <div
            className={joinClasses(styles.main, "FIXME" && styles.active)}
            style={{
                left: offset.x + movingOffset.x,
                top: offset.y + movingOffset.y,
            }}
            ref={paneRef}
        >
            <div className={styles.header} ref={paneHeaderRef}>
                <div className={styles.filename}>
                    <FontAwesomeIcon icon={faFile} />
                    &nbsp;
                    {filename}
                </div>
                <FontAwesomeIcon icon={faXmark} />
            </div>
            <pre className={styles.fileContents}>
                {contents.split("\n").map((line, i) => (
                    <span key={i}>{line}</span>
                ))}
            </pre>
        </div>
    );
}

export default Pane;
