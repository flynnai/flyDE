import { useState } from "react";
import styles from "./App.module.scss";
import MenuColumn from "./MenuColumn";
import Pane from "./Pane";
import useSimFilesystem from "./useSimFilesystem";

function App() {
    const [panes, setPanes] = useState({});
    const { fileTree } = useSimFilesystem();
    console.log("Filetree is ", fileTree);
    return (
        <div className={styles.main}>
            <div className={styles.workArea}>
                <MenuColumn />
                {Object.keys(panes).map((path) => (
                    <Pane path={path} />
                ))}
            </div>
        </div>
    );
}

export default App;
