import React, { useEffect, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./CodeEditor.module.scss";

const CodeEditor = React.memo(({ content, setContent, extension }) => {
    const inputRef = useRef(null);
    useEffect(() => {
        const input = inputRef.current;
        const pre = document.querySelector("." + styles.highlightedContents);
        if (input) {
            const onResize = () => {
                pre.scrollTop = input.scrollTop;
                pre.scrollLeft = input.scrollLeft;
            };
            input.addEventListener("scroll", onResize);
            return () => {
                input.removeEventListener("scroll", onResize);
            };
        }
    }, [inputRef.current]);

    return (
        <div className={styles.main}>
            <textarea
                className={styles.editorInput}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                ref={inputRef}
            />
            <SyntaxHighlighter
                language={extension}
                style={docco}
                className={styles.highlightedContents}
                showLineNumbers
                lineNumberStyle={{ minWidth: "1.25em", paddingRight: "1em" }}
            >
                {content}
            </SyntaxHighlighter>
        </div>
    );
});

export default CodeEditor;
