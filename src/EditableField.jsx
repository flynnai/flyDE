import { useEffect, useRef, useState } from "react";
import styles from "./EditableField.module.scss";
import { joinClasses } from "./utils";

function EditableField({ content, setContent, postfix }) {
    const [editedContent, setEditedContent] = useState(content);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);
    const beginEditing = () => {
        const input = inputRef.current;
        if (input) {
            input.focus();
        }
        console.log("inputRef.current.", inputRef.current);
        setIsEditing(true);
    };
    const exitEditing = () => {
        setContent(editedContent);
        setIsEditing(false);
    };

    return (
        <div
            className={joinClasses(styles.main, isEditing && styles.editing)}
            onClick={!isEditing ? beginEditing : undefined}
        >
            {!isEditing && <span>{content}</span>}
            {isEditing && (
                <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    onBlur={exitEditing}
                    onKeyDown={(e) => e.key === "Enter" && exitEditing()}
                    ref={inputRef}
                    autoFocus
                />
            )}
            {postfix}
        </div>
    );
}

export default EditableField;
