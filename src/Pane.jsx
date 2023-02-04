import { useSelector } from "react-redux";
import styles from "./Pane.module.scss";

function Pane({ path }) {
    const pane = useSelector((state) => state.panes[path]);

    return <div className={styles.main}>{JSON.stringify(pane)}</div>;
}

export default Pane;
