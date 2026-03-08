import Badge from "../../../components/ui/Badge"
import { priorityConfig, sizeConfig, statusConfig } from "../../../constants/todo"
import type { Todo } from "../../../types/todo"
import { formatDate } from "../../../utils/format"

type TodoCardProps = {
  todo: Todo
  onClick: () => void
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onClick }) => {
  const priority = priorityConfig[todo.priority]
  const status = statusConfig[todo.status]
  const size = sizeConfig[todo.size]

  const formattedDate = formatDate(todo.deadline)

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col h-40"
    >
      <div className="flex justify-end mb-2">
        <div className={`flex items-center gap-1 ${status.text}`}>
          <span className={`w-2 h-2 rounded-full ${status.dot}`} />
          <span className="text-[10px] font-semibold uppercase tracking-wide">
            {status.label}
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-[#1a1a2e] leading-snug line-clamp-1 flex-1 mb-3">
        {todo.title}
      </p>
      <div className="flex gap-1.5 mb-3">
        <Badge label={priority.label} colorClass={priority.color} dotClass={priority.dot} />
        <Badge
          label={size}
          colorClass="bg-violet-50 text-violet-600"
          dotClass="bg-violet-500"
        />
      </div>
      <div className="pt-2.5 border-t border-slate-100">
        <span className="text-xs text-slate-400">📅 {formattedDate}</span>
      </div>
    </div>
  )
}

export default TodoCard
