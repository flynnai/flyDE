import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./CodeEditor.module.scss";

const CodeEditor = React.memo(({ content, extension }) => {
    return (
        <div className={styles.main}>
            <textarea className={styles.editorInput} />
            <SyntaxHighlighter
                language={extension}
                style={docco}
                className={styles.highlightedContents}
                showLineNumbers
                wrapLongLines
                lineNumberStyle={{ width: "1.25em", paddingRight: "1em" }}
            >
                {content}
            </SyntaxHighlighter>
        </div>
    );
});

export default CodeEditor;
