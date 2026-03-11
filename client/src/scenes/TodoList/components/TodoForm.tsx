import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTodo } from '../../../context/TodoContext'
import { useLoading } from '../../../context/LoadingContext'
import type {
  Todo,
  CreateTodoInput,
  UpdateTodoInput,
} from '../../../types/todo'
import Button from '../../../components/ui/Button'
import InputField from '../../../components/ui/InputField'
import SelectField from '../../../components/ui/SelectField'
import { sleep } from '../../../utils/sleep'
import { todoSchema, type TodoFormValues } from '../../../schemas/todoSchema'
import {
  priorityOptions,
  sizeOptions,
  statusOptions,
} from '../../../constants/todoOptions'

type TodoFormProps =
  | { mode: 'create'; onClose: () => void }
  | { mode: 'edit'; todo: Todo; onClose: () => void }

const TodoForm: React.FC<TodoFormProps> = (props) => {
  const { onClose } = props
  const { addTodo, updateTodo } = useTodo()
  const { showLoading, hideLoading } = useLoading()

  const isEdit = props.mode === 'edit'
  const todo = isEdit ? props.todo : null

  const today = new Date()
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: isEdit
      ? {
          title: todo?.title ?? '',
          description: todo?.description ?? '',
          deadline: todo?.deadline.split('T')[0] ?? '',
          size: todo?.size ?? '',
          priority: todo?.priority ?? '',
          status: todo?.status ?? '',
        }
      : {
          title: '',
          description: '',
          deadline: '',
          size: '',
          priority: '',
          status: '',
        },
  })

  const size = useWatch({ control, name: 'size' })
  const priority = useWatch({ control, name: 'priority' })
  const status = useWatch({ control, name: 'status' })

  const onSubmit = async (values: TodoFormValues) => {
    showLoading()
    if (isEdit) {
      await updateTodo(todo!.id, values as UpdateTodoInput)
    } else {
      await addTodo(values as CreateTodoInput)
    }
    await sleep(500)
    hideLoading()
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputField
        label="Title"
        placeholder="Task title"
        error={errors.title?.message}
        {...register('title')}
      />

      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500">
          Description
        </label>
        <textarea
          placeholder="Task description (optional)"
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
          {...register('description')}
        />
        {errors.description && (
          <p className="text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      <InputField
        label="Deadline"
        type="date"
        min={minDate}
        error={errors.deadline?.message}
        {...register('deadline')}
      />

      <div className="grid grid-cols-3 gap-3">
        <SelectField
          label="Size"
          value={size}
          onChange={(val) => setValue('size', val)}
          options={sizeOptions}
          error={errors.size?.message}
        />
        <SelectField
          label="Priority"
          value={priority}
          onChange={(val) => setValue('priority', val)}
          options={priorityOptions}
          error={errors.priority?.message}
        />
        <SelectField
          label="Status"
          value={status}
          onChange={(val) => setValue('status', val)}
          options={statusOptions}
          error={errors.status?.message}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button label="Cancel" variant="secondary" onClick={onClose} />
        <Button label={isEdit ? 'Save Changes' : 'Create Task'} type="submit" />
      </div>
    </form>
  )
}

export default TodoForm
