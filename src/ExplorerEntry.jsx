import { useState } from "react";
import styles from "./ExplorerEntry.module.scss";
import { joinClasses } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function ExplorerEntry({ node, openFile }) {
    const [isExpanded, setIsExpanded] = useState(true);
    console.log("Rendering entry for node", node.children);
    if ("children" in node) {
        return (
            <>
                <div
                    className={joinClasses(styles.entryWrapper, styles.folder)}
                    onClick={() => setIsExpanded((e) => !e)}
                >
                    <div className={styles.label}>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className={joinClasses(
                                styles.icon,
                                isExpanded && styles.rotate
                            )}
                        />{" "}
                        {node.name}
                    </div>
                </div>
                <div
                    className={joinClasses(
                        styles.nestedContent,
                        !isExpanded && styles.hidden
                    )}
                >
                    {Object.values(node.children).map((child) => (
                        <ExplorerEntry
                            node={child}
                            key={child.name}
                            openFile={openFile}
                        />
                    ))}
                </div>
            </>
        );
    } else {
        let subDirs = node.name.split("/");
        let filename = subDirs[subDirs.length - 1];
        return (
            <div
                className={joinClasses(styles.entryWrapper, styles.file)}
                onClick={() => openFile(node.name)}
            >
                {filename}
            </div>
        );
    }
}

export default ExplorerEntry;
