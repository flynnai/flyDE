import { useRef, useState } from "react";
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
        "foo/bar.js": {
            content:
                "asdkfj aoisdfh asdf asdioas\nasdf\nas\n\nasdf\nasdfansdfasdfaiojwofw.js",
        },
    });
    const { fileTree, loadZip, getFileContents } = useSimFilesystem();
    console.log("Filetree is ", fileTree);

    const openFile = async (path) => {
        if (path in panes) {
            // TODO focus the pane
            return;
        }
        setPanes({
            ...panes,
            [path]: {
                content: await getFileContents(path),
            },
        });
    };

    return (
        <div className={styles.main}>
            <div className={styles.workArea}>
                <MenuColumn
                    loadZip={loadZip}
                    fileTree={fileTree}
                    openFile={openFile}
                />
                <div className={styles.paneContainer}>
                    {Object.entries(panes).map(([path, pane], i) => (
                        <Pane
                            path={path}
                            pane={pane}
                            initOffset={getInitOffset(i)}
                            key={path}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
