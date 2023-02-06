import React, { useEffect, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./CodeEditor.module.scss";

const CodeEditor = React.memo(({ content, setContent, extension }) => {
    const inputRef = useRef(null);

    // mirror textarea and pre scroll heights
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

    // handle commands and special keys
    useEffect(() => {
        const input = inputRef.current;
        if (input) {
            const onKeyDown = (e) => {
                if (e.key === "Tab") {
                    // prevent onChange
                    e.preventDefault();

                    // add a four-space tab
                    const currentText = input.value;
                    const beforeCursor = currentText.slice(
                        0,
                        input.selectionStart
                    );
                    const afterCursor = currentText.slice(
                        input.selectionEnd,
                        currentText.length
                    );
                    const newCursorPos = input.selectionStart + 4; // after 4 spaces

                    let newText = beforeCursor + "    " + afterCursor;
                    setContent(newText);
                    input.value = newText; // prevent cursor moving
                    input.setSelectionRange(newCursorPos, newCursorPos);
                } else if (e.key === "Enter") {
                    // prevent onChange
                    e.preventDefault();

                    const currentText = input.value;
                    const beforeCursor = currentText.slice(
                        0,
                        input.selectionStart
                    );
                    const afterCursor = currentText.slice(
                        input.selectionEnd,
                        currentText.length
                    );
                    // get current number of tabs for this line
                    let lines = beforeCursor.split("\n");
                    let spaceMatch = lines[lines.length - 1].match(/^ +/);
                    let numTabs = spaceMatch
                        ? Math.floor(spaceMatch[0].length / 4)
                        : 0;

                    // piece together new text, and matching cursor position
                    let newText =
                        beforeCursor +
                        "\n" +
                        "    ".repeat(numTabs) +
                        afterCursor;
                    const newCursorPos = input.selectionStart + 1 + 4 * numTabs;

                    setContent(newText);
                    input.value = newText; // prevent cursor moving
                    input.setSelectionRange(newCursorPos, newCursorPos);
                }
            };
            input.addEventListener("keydown", onKeyDown);
            return () => {
                input.removeEventListener("keydown", onKeyDown);
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
