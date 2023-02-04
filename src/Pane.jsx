import styles from "./Pane.module.scss";

function Pane({ path, pane }) {
    return <div className={styles.main}>{JSON.stringify(pane)}</div>;
}

export default Pane;
