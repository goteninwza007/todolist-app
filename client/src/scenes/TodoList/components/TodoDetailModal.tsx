import type { Todo } from '../../../types/todo'
import { useTodo } from '../../../context/TodoContext'
import { useLoading } from '../../../context/LoadingContext'
import Button from '../../../components/ui/Button'
import StatusSelector from '../../../components/ui/StatusSelector'
import Badge from '../../../components/ui/Badge'
import { priorityConfig, sizeConfig } from '../../../constants/todo'
import { formatDate } from '../../../utils/format'
import { sleep } from '../../../utils/sleep'
import type { Status } from '../../../types/todo'

type TodoDetailModalProps = {
  todo: Todo
  onClose: () => void
  onEdit: () => void
}

const TodoDetailModal: React.FC<TodoDetailModalProps> = ({
  todo,
  onClose,
  onEdit,
}) => {
  const { deleteTodo, updateTodo } = useTodo()
  const { showLoading, hideLoading } = useLoading()

  const handleDelete = async () => {
    showLoading()
    await deleteTodo(todo.id)
    await sleep(500)
    hideLoading()
    onClose()
  }

  const handleStatusChange = async (status: Status) => {
    showLoading()
    await updateTodo(todo.id, {
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline.split('T')[0],
      size: todo.size,
      priority: todo.priority,
      status,
    })
    await sleep(500)
    hideLoading()
  }

  const formattedDate = formatDate(todo.deadline)
  const priority = priorityConfig[todo.priority]
  const size = sizeConfig[todo.size]

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-[#1a1a2e] leading-snug">
        {todo.title}
      </h2>
      <div className="flex flex-wrap gap-2">
        <Badge
          label={priority.label}
          colorClass={priority.color}
          dotClass={priority.dot}
        />
        <Badge
          label={size}
          colorClass="bg-violet-50 text-violet-600"
          dotClass="bg-violet-500"
        />
      </div>
      {todo.description && (
        <div>
          <p className="text-xs font-medium text-slate-400 mb-1">Description</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {todo.description}
          </p>
        </div>
      )}
      <div>
        <p className="text-xs font-medium text-slate-400 mb-1">Deadline</p>
        <p className="text-sm text-slate-600">📅 {formattedDate}</p>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 mb-2">Status</p>
        <StatusSelector value={todo.status} onChange={handleStatusChange} />
      </div>
      <div className="flex justify-between pt-3 border-t border-slate-100">
        <Button
          label="Delete"
          variant="danger"
          size="sm"
          onClick={handleDelete}
        />
        <div className="flex gap-2">
          <Button
            label="Cancel"
            variant="secondary"
            size="sm"
            onClick={onClose}
          />
          <Button label="Edit" size="sm" onClick={onEdit} />
        </div>
      </div>
    </div>
  )
}

export default TodoDetailModal
