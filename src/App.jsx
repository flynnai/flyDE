import { useSelector } from "react-redux";
import styles from "./App.module.scss";
import FileExplorer from "./FileExplorer";
import Pane from "./Pane";

function App() {
    const panesPaths = useSelector((state) => Object.keys(state.panes));

    return (
        <div className={styles.main}>
            <div className={styles.workArea}>
                <FileExplorer />
                {panesPaths.map((path) => (
                    <Pane path={path} />
                ))}
            </div>
        </div>
    );
}

export default App;
