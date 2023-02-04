import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./CodeEditor.module.scss";

const CodeEditor = React.memo(({ content, extension }) => {
    return (
        <SyntaxHighlighter
            language={extension}
            style={docco}
            className={styles.highlightedContents}
            showLineNumbers
            wrapLongLines
        >
            {content}
        </SyntaxHighlighter>
    );
});

export default CodeEditor;
