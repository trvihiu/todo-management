import { TodosTable } from "@/features/todos"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className={"p-4"}>
      <Link href="/new">Create Todo</Link>
      <TodosTable />
    </div>
  )
}
