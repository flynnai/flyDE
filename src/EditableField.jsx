import styles from "./EditableField.module.scss";

function EditableField({ content, setContent }) {
    return (
        <div className={styles.main}>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    );
}

export default EditableField;
