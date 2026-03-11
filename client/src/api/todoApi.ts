import { Get, Post, Put, Delete } from './fetcher'
import type { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo'

const todoApi = {
  getAll: () => Get<Todo[]>('/api/todos'),

  create: (input: CreateTodoInput) => Post<Todo>('/api/todos', input),

  update: (id: number, input: UpdateTodoInput) =>
    Put<Todo>(`/api/todos/${id}`, input),

  delete: (id: number) => Delete<void>(`/api/todos/${id}`),
}

export default todoApi
