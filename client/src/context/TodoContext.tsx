import { createContext, useContext, useReducer, useCallback } from 'react'
import todoApi from '../api/todoApi'
import type { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo'
import { toast } from 'sonner'

type TodoState = {
  todos: Todo[]
  error: string | null
}

type TodoAction =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_ERROR'; payload: string | null }

const initialState: TodoState = {
  todos: [],
  error: null,
}

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'SET_TODOS':
      return { ...state, todos: action.payload }
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] }
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

type TodoContextType = {
  state: TodoState
  fetchTodos: () => Promise<void>
  addTodo: (input: CreateTodoInput) => Promise<void>
  updateTodo: (id: number, input: UpdateTodoInput) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
}

const TodoContext = createContext<TodoContextType | null>(null)

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const fetchTodos = useCallback(async () => {
    dispatch({ type: 'SET_ERROR', payload: null })
    try {
      const res = await todoApi.getAll()
      dispatch({ type: 'SET_TODOS', payload: res.data ?? [] })
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch todos' })
    }
  }, [])

  const addTodo = useCallback(async (input: CreateTodoInput) => {
    try {
      const res = await todoApi.create(input)
      if (res.data) {
        dispatch({ type: 'ADD_TODO', payload: res.data })
        toast.success('Task created')
      }
    } catch {
      toast.error('Failed to add todo')
    }
  }, [])

  const updateTodo = useCallback(async (id: number, input: UpdateTodoInput) => {
    try {
      const res = await todoApi.update(id, input)
      if (res.data) {
        dispatch({ type: 'UPDATE_TODO', payload: res.data })
        toast.success('Task updated')
      }
    } catch {
      toast.error('Failed to update todo')
    }
  }, [])

  const deleteTodo = useCallback(async (id: number) => {
    try {
      await todoApi.delete(id)
      dispatch({ type: 'DELETE_TODO', payload: id })
      toast.success('Task deleted')
    } catch {
      toast.error('Failed to delete todo')
    }
  }, [])

  return (
    <TodoContext.Provider
      value={{ state, fetchTodos, addTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTodo = () => {
  const context = useContext(TodoContext)
  if (!context) throw new Error('useTodo must be used within TodoProvider')
  return context
}
