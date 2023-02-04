import styles from "./Pane.module.scss";

function Pane({ path }) {
    return <div className={styles.main}>{JSON.stringify({})}</div>;
}

export default Pane;
