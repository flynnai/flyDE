import { useSelector } from "react-redux";
import styles from "./App.module.scss";
import MenuColumn from "./MenuColumn";
import Pane from "./Pane";

function App() {
    const panesPaths = useSelector((state) => Object.keys(state.panes));

    return (
        <div className={styles.main}>
            <div className={styles.workArea}>
                <MenuColumn />
                {panesPaths.map((path) => (
                    <Pane path={path} />
                ))}
            </div>
        </div>
    );
}

export default App;
