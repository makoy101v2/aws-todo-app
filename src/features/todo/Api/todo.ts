import { generateClient } from "aws-amplify/api";
import { createTodo, deleteTodo, updateTodo } from "../../../graphql/mutations";
import { listTodos, getTodo } from "../../../graphql/queries";
import type {
  CreateTodoMutation,
  CreateTodoMutationVariables,
  ListTodosQuery,
  GetTodoQuery,
  GetTodoQueryVariables,
  UpdateTodoMutation,
  UpdateTodoMutationVariables,
} from "../../../API";

const client = generateClient();

interface UpdateTaskInput {
  name: string;
  description?: string;
}

// A strongly typed addTodo function
export const addTodo = async (task: {
  name: string;
  description?: string;
  completed: boolean;
}) => {
  try {
    const input: CreateTodoMutationVariables = {
      input: {
        name: task.name,
        description: task.description,
        completed: false,
      },
    };

    const result = (await client.graphql({
      query: createTodo,
      variables: input,
      authMode: "userPool",
    })) as { data: CreateTodoMutation };

    return result.data.createTodo;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error; // Re-throw so calling code can handle it
  }
};

export const getTodos = async () => {
  try {
    const result = (await client.graphql({
      query: listTodos,
      authMode: "userPool",
    })) as { data: ListTodosQuery };

    return result.data.listTodos?.items || [];
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const deleteTodoTasks = async (id: string) => {
  try {
    const result = await client.graphql({
      query: deleteTodo,
      variables: { input: { id } },
      authMode: "userPool",
    });

    return result.data.deleteTodo;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export const getSingleTask = async (id: string) => {
  try {
    const variables: GetTodoQueryVariables = { id };
    const result = (await client.graphql({
      query: getTodo,
      variables,
      authMode: "userPool",
    })) as { data: GetTodoQuery };

    return result.data.getTodo;
  } catch (error) {
    console.log("Error on getting a Single task:", error);
    throw error;
  }
};

export const updateSingleTask = async (
  id: string,
  updateTask: UpdateTaskInput
) => {
  try {
    const variables: UpdateTodoMutationVariables = {
      input: {
        id,
        ...updateTask,
      },
    };

    const result = (await client.graphql({
      query: updateTodo,
      variables,
      authMode: "userPool",
    })) as { data: UpdateTodoMutation };

    return result.data.updateTodo;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};
