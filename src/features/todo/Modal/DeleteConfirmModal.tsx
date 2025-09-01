import styles from "./DeleteConfirmModal.module.css";

interface DeleteConfirmModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
  readonly taskTitle?: string;
}

function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  taskTitle,
}: DeleteConfirmModalProps) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Delete Task</h3>
        <p>
          Are you sure you want to delete
          {taskTitle ? ` "${taskTitle}"` : " this task"}?
        </p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.deleteBtn} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
