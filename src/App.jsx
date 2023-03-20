import { useEffect, useRef, useState } from "react";
import styles from "./App.module.scss";
import MenuColumn from "./MenuColumn";
import Pane from "./Pane";
import useSimFilesystem from "./useSimFilesystem";
import { omit } from "./utils";

const paneInitOffsets = new Array(10)
    .fill(0)
    .map((_, i) => ({ x: i * 10 + 10, y: i * 10 + 10 }));
const getInitOffset = (i) => paneInitOffsets[i % paneInitOffsets.length];

function App() {
    const [panes, setPanes] = useState({});
    const [activePane, setActivePane] = useState(null);

    const {
        fileTree,
        loadZip,
        getFileContents,
        writeToFile,
        downloadZip,
        hydrateFromLocalStorage,
    } = useSimFilesystem();
    console.log("Filetree is ", fileTree);

    const openFile = async (path) => {
        if (!(path in panes)) {
            setPanes({
                ...panes,
                [path]: {
                    content: await getFileContents(path),
                    order: Object.values(panes).length,
                },
            });
        }
        movePaneToFront(path);
    };

    const closeFile = (path) => {
        setPanes({ ...omit(path, panes) });
    };

    const movePaneToFront = (path) => {
        if (activePane === path) {
            // already at front
            return;
        }

        // set pane at `path` to highest order
        setPanes((curr) => {
            let oldOrder = curr[path].order;
            // for everything >= prevOrder, decrement
            const newPanes = {};
            for (const [otherPath, pane] of Object.entries(curr)) {
                if (path === otherPath) {
                    newPanes[path] = {
                        ...pane,
                        order: Object.entries(curr).length - 1,
                    };
                } else {
                    newPanes[otherPath] = {
                        ...pane,
                        order: pane.order - (pane.order >= oldOrder),
                    };
                }
            }
            return newPanes;
        });
        setActivePane(path);
    };

    // prevent default ⌘ + s behavior
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "s" && e.metaKey) {
                e.preventDefault();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.workArea}>
                <MenuColumn
                    loadZip={loadZip}
                    fileTree={fileTree}
                    openFile={openFile}
                    downloadZip={downloadZip}
                    hydrateFromLocalStorage={hydrateFromLocalStorage}
                />
                <div className={styles.paneContainer}>
                    {Object.entries(panes).map(([path, pane], i) => (
                        <Pane
                            path={path}
                            pane={pane}
                            initOffset={getInitOffset(i)}
                            key={path}
                            closeFile={closeFile}
                            writeToFile={writeToFile}
                            movePaneToFront={movePaneToFront}
                            isActive={activePane === path}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
