import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./CodeEditor.module.scss";

const CodeEditor = React.memo(({ content, setContent, extension }) => {
    return (
        <div className={styles.main}>
            <textarea
                className={styles.editorInput}
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
