export type Size = 'xs' | 's' | 'm' | 'l' | 'xl'
export type Priority = 'low' | 'medium' | 'high'
export type Status = 'todo' | 'in_progress' | 'done'

export type Todo = {
  id: number
  title: string
  description: string
  deadline: string
  size: Size
  priority: Priority
  status: Status
  created_at: string
  updated_at: string
}

export type CreateTodoInput = {
  title: string
  description: string
  deadline: string
  size: Size
  priority: Priority
  status: Status
}

export type UpdateTodoInput = CreateTodoInput
