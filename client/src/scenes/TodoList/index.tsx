import { useEffect, useState } from "react"
import { useTodo } from "../../context/TodoContext"
import TodoCard from "./components/TodoCard"
import TodoForm from "./components/TodoForm"
import TodoDetailModal from "./components/TodoDetailModal"
import Modal from "../../components/ui/Modal"
import type { Status } from "../../types/todo"

type FilterStatus = "all" | Status
type SortBy = "created_at" | "deadline"

const filters: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "To Do", value: "todo" },
  { label: "In Progress", value: "in_progress" },
  { label: "Done", value: "done" },
]

const sorts: { label: string; value: SortBy }[] = [
  { label: "Latest", value: "created_at" },
  { label: "Deadline", value: "deadline" },
]

const TodoListScene: React.FC = () => {
  const { fetchTodos, state } = useTodo()
  const [filter, setFilter] = useState<FilterStatus>("all")
  const [sortBy, setSortBy] = useState<SortBy>("created_at")
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const selectedTodo = selectedId !== null
    ? state.todos.find((t) => t.id === selectedId) ?? null
    : null

  const filteredTodos = state.todos
    .filter((todo) => filter === "all" ? true : todo.status === filter)
    .sort((a, b) => {
      if (sortBy === "deadline") {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      }
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    })

  return (
    <div className="min-h-screen bg-[#f0f0f5]">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-8">
          <h1 className="font-['Fraunces'] text-3xl text-[#1a1a2e] font-light">My Tasks</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + New Task
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${filter === f.value
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            {sorts.map((s) => (
              <button
                key={s.value}
                onClick={() => setSortBy(s.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${sortBy === s.value
                  ? "bg-slate-700 text-white border-slate-700"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                  }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {state.error && (
          <p className="text-sm text-red-500 mb-4">{state.error}</p>
        )}

        {filteredTodos.length === 0 && (
          <p className="text-center text-sm text-slate-400 mt-20">
            No tasks found. Add one!
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onClick={() => {
                setSelectedId(todo.id)
                setIsEditing(false)
              }}
            />
          ))}
        </div>
      </div>

      {isFormOpen && (
        <Modal title="New Task" onClose={() => setIsFormOpen(false)}>
          <TodoForm mode="create" onClose={() => setIsFormOpen(false)} />
        </Modal>
      )}

      {selectedTodo && (
        <Modal
          title={isEditing ? "Edit Task" : "Task Detail"}
          onClose={() => {
            setSelectedId(null)
            setIsEditing(false)
          }}
        >
          {isEditing ? (
            <TodoForm
              mode="edit"
              todo={selectedTodo}
              onClose={() => {
                setSelectedId(null)
                setIsEditing(false)
              }}
            />
          ) : (
            <TodoDetailModal
              todo={selectedTodo}
              onClose={() => setSelectedId(null)}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </Modal>
      )}
    </div>
  )
}

export default TodoListScene
