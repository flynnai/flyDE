import { useEffect, useRef, useState } from "react";
import styles from "./Pane.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faFile } from "@fortawesome/free-solid-svg-icons";
import { joinClasses, lastArrayElt } from "./utils";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const parsePath = (path) => {
    let splitPath = path.split("/");
    let filename = splitPath[splitPath.length - 1];
    let splitFilename = filename.split(".");
    let extension = splitFilename[splitFilename.length - 1];
    return [extension];
};

function Pane({ path, pane, initOffset, closeFile }) {
    console.log("Rendering pane:", pane);
    const [offset, setOffset] = useState({ x: initOffset.x, y: initOffset.y });
    const [movingOffset, setMovingOffset] = useState({ x: 0, y: 0 });
    const paneHeaderRef = useRef(null);

    const filename = lastArrayElt(path.split("/"));
    const extension = lastArrayElt(filename.split("."));

    // moveable panes logic
    useEffect(() => {
        const paneHeader = paneHeaderRef.current;
        if (paneHeader) {
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

            const handleDragStart = (e) => {
                if (startPos) {
                    e.preventDefault();
                }
            };

            paneHeader.addEventListener("mousedown", mouseDown);
            document.addEventListener("mouseup", mouseUp);
            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("dragstart", handleDragStart);
            return () => {
                paneHeader.removeEventListener("mousedown", mouseDown);
                document.removeEventListener("mouseup", mouseUp);
                document.removeEventListener("mousemove", mouseMove);
                document.removeEventListener("dragstart", handleDragStart);
            };
        }
    }, [offset]);

    return (
        <div
            className={joinClasses(styles.main, "FIXME" && styles.active)}
            style={{
                left: offset.x + movingOffset.x,
                top: offset.y + movingOffset.y,
            }}
        >
            <div className={styles.header} ref={paneHeaderRef}>
                <div className={styles.filename}>
                    <FontAwesomeIcon icon={faFile} />
                    &nbsp;
                    {filename}
                </div>
                <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.closeButton}
                    onClick={() => closeFile(path)}
                />
            </div>
            {/* <pre className={styles.fileContents}>
                {pane.content.split("\n").map((line, i) => (
                    <span key={i}>{line}</span>
                ))}
            </pre> */}
            <SyntaxHighlighter
                language={extension}
                style={docco}
                className={styles.highlightedContents}
                showLineNumbers
            >
                {pane.content}
            </SyntaxHighlighter>
        </div>
    );
}

export default Pane;
