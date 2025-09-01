import { useEffect } from "react";
import styles from "./AddTaskModal.module.css";

interface AddTaskModalProps {
  onClose: () => void;
  onAddTask: (task: {
    id?: string;
    title: string;
    description?: string;
  }) => void;
  isLoading: boolean;
  task?: {
    id?: string;
    title: string;
    description?: string;
    isEditing: boolean;
  };
}

function AddEditTaskModal({
  onClose,
  onAddTask,
  isLoading,
  task,
}: Readonly<AddTaskModalProps>) {
  useEffect(() => {
    // Close on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (title.trim() && description.trim()) {
      onAddTask({ title: title.trim(), description: description.trim() });
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{task?.isEditing ? "Edit Task" : "Add New Task"}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task title..."
            className={styles.input}
            autoFocus
            required
            defaultValue={task?.title || ""}
          />
          <input
            type="text"
            name="description"
            placeholder="Task description..."
            className={styles.input}
            autoFocus
            required
            defaultValue={task?.description || ""}
          />
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
            <button type="submit" className={styles.primary}>
              {isLoading
                ? task?.isEditing
                  ? "Saving..."
                  : "Adding..."
                : task?.isEditing
                ? "Save Changes"
                : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEditTaskModal;
