import { z } from 'zod'
import {
  sizeOptions,
  priorityOptions,
  statusOptions,
} from '../constants/todoOptions'

const sizeValues = sizeOptions.map((o) => o.value)
const priorityValues = priorityOptions.map((o) => o.value)
const statusValues = statusOptions.map((o) => o.value)

export const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  description: z.string().max(500, 'Description is too long'),
  deadline: z.string().min(1, 'Deadline is required'),
  size: z.enum(sizeValues, { message: 'Size is required' }),
  priority: z.enum(priorityValues, { message: 'Priority is required' }),
  status: z.enum(statusValues, { message: 'Status is required' }),
})

export type TodoFormValues = z.infer<typeof todoSchema>
