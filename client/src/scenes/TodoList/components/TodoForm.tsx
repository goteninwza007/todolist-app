import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTodo } from "../../../context/TodoContext"
import { useLoading } from "../../../context/LoadingContext"
import type { CreateTodoInput } from "../../../types/todo"
import Button from "../../../components/ui/Button"
import InputField from "../../../components/ui/InputField"
import SelectField from "../../../components/ui/SelectField"
import { sleep } from "../../../utils/sleep"
import { todoSchema, type TodoFormValues } from "../../../schemas/todoSchema"
import { priorityOptions, sizeOptions, statusOptions } from "../../../constants/todoOptions"

type TodoFormProps = {
  onClose: () => void
}

const TodoForm: React.FC<TodoFormProps> = ({ onClose }) => {
  const { addTodo } = useTodo()
  const { showLoading, hideLoading } = useLoading()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      size: "",
      priority: "",
      status: "",
    },
  })

  const onSubmit = async (values: TodoFormValues) => {
    showLoading()
    await addTodo(values as CreateTodoInput)
    await sleep(500)
    hideLoading()
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label className="text-xs font-medium text-slate-500 mb-1 block">Title</label>
        <InputField
          placeholder="Task title"
          error={errors.title?.message}
          {...register("title")}
        />
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500 mb-1 block">Description</label>
        <textarea
          placeholder="Task description (optional)"
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500 mb-1 block">Deadline</label>
        <InputField
          type="date"
          error={errors.deadline?.message}
          min={new Date().toISOString().split("T")[0]}
          {...register("deadline")}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">Size</label>
          <SelectField
            value={watch("size")}
            onChange={(val) => setValue("size", val)}
            options={sizeOptions}
            error={errors.size?.message}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">Priority</label>
          <SelectField
            value={watch("priority")}
            onChange={(val) => setValue("priority", val)}
            options={priorityOptions}
            error={errors.priority?.message}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-500 mb-1 block">Status</label>
          <SelectField
            value={watch("status")}
            onChange={(val) => setValue("status", val)}
            options={statusOptions}
            error={errors.status?.message}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button label="Cancel" variant="secondary" onClick={onClose} />
        <Button label="Create Task" type="submit" />
      </div>
    </form>
  )
}

export default TodoForm