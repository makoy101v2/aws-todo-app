import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Todo from "../todo";

// Mock the API functions
vi.mock("../Api/todo", () => ({
  getTodos: vi.fn(),
  addTodo: vi.fn(),
  deleteTodoTasks: vi.fn(),
  getSingleTask: vi.fn(),
  updateSingleTask: vi.fn(),
}));

import { getTodos, addTodo } from "../Api/todo";

describe("Todo Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.only("renders loading state, then todos", async () => {
    (getTodos as any).mockResolvedValue([
      { id: "1", name: "Test Task", description: "desc", completed: false },
    ]);

    render(<Todo />);
    expect(screen.getByText(/loading todos/i)).toBeInTheDocument();

    // Wait for todos to load
    expect(await screen.findByText("Test Task")).toBeInTheDocument();
  });

  it("shows empty state if no todos", async () => {
    (getTodos as any).mockResolvedValue([]);

    render(<Todo />);
    expect(await screen.findByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it("can add a new todo", async () => {
    (getTodos as any).mockResolvedValue([]);
    (addTodo as any).mockResolvedValue({
      id: "2",
      name: "New Task",
      description: "New Desc",
      completed: false,
    });

    render(<Todo />);
    fireEvent.click(await screen.findByText(/add first task/i));
    fireEvent.change(screen.getByPlaceholderText(/task title/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByPlaceholderText(/task description/i), {
      target: { value: "New Desc" },
    });
    fireEvent.click(screen.getByText(/add task/i));

    expect(await screen.findByText("New Task")).toBeInTheDocument();
  });

  // Add more tests for edit, delete, etc.
});
