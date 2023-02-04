import { useState } from "react";
import styles from "./App.module.scss";
import MenuColumn from "./MenuColumn";
import Pane from "./Pane";
import useSimFilesystem from "./useSimFilesystem";

function App() {
    const [panes, setPanes] = useState({});
    const { fileTree, loadZip } = useSimFilesystem();
    console.log("Filetree is ", fileTree);

    return (
        <div className={styles.main}>
            <div className={styles.workArea}>
                <MenuColumn loadZip={loadZip} fileTree={fileTree} />
                {Object.entries(panes).map(([path, pane]) => (
                    <Pane path={path} pane={pane} />
                ))}
            </div>
        </div>
    );
}

export default App;
