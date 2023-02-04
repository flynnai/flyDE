import { useState } from "react";
import styles from "./App.module.scss";
import MenuColumn from "./MenuColumn";
import Pane from "./Pane";
import useSimFilesystem from "./useSimFilesystem";

const paneInitOffsets = new Array(10)
    .fill(0)
    .map((_, i) => ({ x: i * 10 + 10, y: i * 10 + 10 }));
const getInitOffset = (i) => paneInitOffsets[i % paneInitOffsets.length];

function App() {
    const [panes, setPanes] = useState({
        "foo/bar.js": { name: "bar.js" },
    });
    const { fileTree, loadZip } = useSimFilesystem();
    console.log("Filetree is ", fileTree);

    return (
        <div className={styles.main}>
            <div className={styles.workArea}>
                <MenuColumn loadZip={loadZip} fileTree={fileTree} />
                <div className={styles.paneContainer}>
                    {Object.entries(panes).map(([path, pane], i) => (
                        <Pane
                            path={path}
                            pane={pane}
                            initOffset={getInitOffset(i)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
