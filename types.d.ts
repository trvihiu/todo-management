type TodoStatus = "todo" | "inprogress" | "done"

type Todo = {
  id: string
  title: string
  description: string
  status: TodoStatus
  startDate: string
  dueDate: string
  createdAt: string
}

type InitTodo = Omit<Todo, "id" | "status" | "createdAt">
type EditedTodo = Omit<Todo, "id" | "createdAt">
