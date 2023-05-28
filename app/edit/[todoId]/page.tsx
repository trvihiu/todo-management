"use client"

import { EditTodoForm, selectTodoByID } from "@/features/todos"
import { useAppSelector } from "@/hooks"

export default function EditTodoPage({
  params,
}: {
  params: { todoId: string }
}) {
  const todo = useAppSelector((state) => selectTodoByID(state, params.todoId))
  if (!todo) return <p>Todo not found</p>
  return <EditTodoForm todo={todo} />
}
