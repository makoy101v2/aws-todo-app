import { useState, useEffect } from "react";

import AddTaskModal from "./Modal/AddEditTaskModal";
import PageHeader from "../../ui/PageHeader";

import {
  addTodo,
  getTodos,
  deleteTodoTasks,
  getSingleTask,
  updateSingleTask,
} from "./Api/todo";

import TodoItem from "./todoItem";

import styles from "./todo.module.css";

interface Task {
  id?: string;
  title: string;
  description?: string;
  completed?: boolean;
}

function Todo() {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todos = await getTodos();
      setTasks(
        todos.map((todo) => ({
          id: todo?.id,
          title: todo?.name || "",
          description: todo?.description || undefined,
          completed: todo?.completed || false,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setIsLoadingTodos(false);
    }
  };

  const handleAddTask = async (newTask: Task) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateSingleTask(editingTask?.id || "", {
          name: newTask.title,
          description: newTask.description,
        });
        setTasks((tasks) =>
          tasks.map((task) =>
            task.id === editingTask?.id
              ? {
                  ...task,
                  title: newTask.title,
                  description: newTask.description,
                }
              : task
          )
        );
      } else {
        // Add logic as before
        const createdTodo = await addTodo({
          name: newTask.title,
          description: newTask.description,
          completed: false,
        });
        setTasks([
          ...tasks,
          {
            id: createdTodo?.id,
            title: createdTodo?.name || newTask.title,
            description: createdTodo?.description || newTask.description,
          },
        ]);
      }
      setShowAddModal(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Failed to add/update todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id?: string) => {
    try {
      setIsLoading(true);
      await deleteTodoTasks(id || "");
      setTasks((tasks) => tasks.filter((task) => task.id !== id)); // Remove from local state
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to delete todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowUpdate = async (id?: string) => {
    setIsEditing(true);
    if (!id) {
      console.error("No ID provided");
      return;
    }
    try {
      const result = await getSingleTask(id);
      if (result) {
        setEditingTask({
          id: result.id,
          title: result.name,
          description: result.description || undefined,
          completed: result.completed,
        });
        setShowAddModal(true);
      }
    } catch (error) {
      console.error("Failed to fetch todo:", error);
    }
  };

  // Extract the nested ternary into a separate function
  const renderTaskContent = () => {
    if (isLoadingTodos) {
      return <div className={styles.loading}>Loading todos...</div>;
    }

    if (tasks.length === 0) {
      return (
        <>
          <div className={styles.topRight}>
            <button
              className={styles.btn}
              onClick={() => setShowAddModal(true)}
            >
              Add First Task
            </button>
          </div>
          <div className={styles.empty}>No tasks yet. Add your first task!</div>
        </>
      );
    }

    return (
      <>
        <div className={styles.topRight}>
          <button className={styles.btn} onClick={() => setShowAddModal(true)}>
            Add Task
          </button>
        </div>
        <div className={styles.taskList}>
          {tasks.map((task, index) => (
            <TodoItem
              key={task.id || `task-${index}`}
              task={task}
              onDelete={handleDeleteTask}
              onUpdate={handleShowUpdate}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <section className={styles.hero}>
        <PageHeader
          title="Your Todo-List"
          subtitle="Overview of your todo and progress"
          icon="📝"
        />
      </section>

      <section className={styles.taskstodo} aria-label="tasks">
        {renderTaskContent()}
      </section>

      {showAddModal && (
        <AddTaskModal
          onClose={() => {
            setShowAddModal(false);
            setEditingTask(null);
          }}
          onAddTask={handleAddTask}
          isLoading={isLoading}
          task={editingTask ? { ...editingTask, isEditing: true } : undefined}
        />
      )}
    </>
  );
}

export default Todo;
