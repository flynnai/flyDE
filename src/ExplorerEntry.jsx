import { useState } from "react";
import styles from "./ExplorerEntry.module.scss";
import { DirNode } from "./FileExplorer";
import { joinClasses } from "./utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Entry({ node }) {
    const [isExpanded, setIsExpanded] = useState(false);
    if (node instanceof DirNode) {
        return (
            <div
                className={joinClasses(
                    styles.entryWrapper,
                    styles.folder,
                    !isExpanded && styles.hidden
                )}
            >
                <div
                    onClick={() => setIsExpanded((e) => !e)}
                    className={styles.label}
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className={joinClasses(styles.chevron)}
                    />{" "}
                    {node.name}
                </div>
                <div className={styles.contents}>
                    {node.getChildren().map((child) => (
                        <Entry node={child} key={child.name} />
                    ))}
                </div>
            </div>
        );
    } else {
        let subDirs = node.name.split("/");
        let filename = subDirs[subDirs.length - 1];
        return (
            <div className={joinClasses(styles.entryWrapper, styles.file)}>
                {filename}
            </div>
        );
    }
}

export default Entry;
