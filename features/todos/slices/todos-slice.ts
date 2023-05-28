import { RootState } from "@/store"
import {
  EntityId,
  PayloadAction,
  createEntityAdapter,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit"
import { formatISO } from "date-fns"

const todosAdapter = createEntityAdapter<Todo>({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
})

const initialState = todosAdapter.getInitialState({})

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      prepare: (initTodo: InitTodo) => {
        const id = nanoid()
        const status: TodoStatus = "todo"
        const createdAt = formatISO(new Date())
        return {
          payload: {
            ...initTodo,
            id,
            status,
            createdAt,
          },
        }
      },
      reducer: (state, action: PayloadAction<Todo>) => {
        todosAdapter.addOne(state, action.payload)
      },
    },
    removeTodos: (state, action: PayloadAction<EntityId[]>) => {
      todosAdapter.removeMany(state, action.payload)
    },
    updateTodoStatus: (
      state,
      action: PayloadAction<Pick<Todo, "id" | "status">>
    ) => {
      const { id, status } = action.payload
      const todo = state.entities[id] as Todo

      todo.status = status
      todosAdapter.upsertOne(state, todo)
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      todosAdapter.upsertOne(state, action.payload)
    },
  },
})

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoByID,
  selectIds: selectTodoIds,
} = todosAdapter.getSelectors((state: RootState) => state.todos)

export const { addTodo, removeTodos, updateTodoStatus, updateTodo } =
  todosSlice.actions

export const todosReducer = todosSlice.reducer
