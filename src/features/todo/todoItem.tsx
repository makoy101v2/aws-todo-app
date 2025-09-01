import { useState } from "react";
import styles from "./todo.module.css";
import DeleteConfirmModal from "./Modal/DeleteConfirmModal";

interface Task {
  readonly id?: string;
  readonly title: string;
  readonly description?: string;
}

interface TodoItemProps {
  readonly task: Readonly<Task>;
  readonly onDelete?: (id?: string) => void;
  readonly onUpdate: (id?: string) => void;
}

function TodoItem({ task, onDelete, onUpdate }: TodoItemProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(false);
    if (onDelete) onDelete(task.id);
  };

  return (
    <div className={styles.taskItem}>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <button className={styles.editBtn} onClick={() => onUpdate(task.id)}>
        Edit
      </button>
      <button
        className={styles.deleteBtn}
        onClick={() => setShowDeleteModal(true)}
      >
        Delete
      </button>
      <DeleteConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        taskTitle={task.title}
      />
    </div>
  );
}

export default TodoItem;
