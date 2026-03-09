import TodoListScene from "./scenes/TodoList"
import { TodoProvider } from "./context/TodoContext"
import { LoadingProvider } from "./context/LoadingContext"
import Spinner from "./components/ui/Spinner"
import { Toaster } from "sonner"

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <TodoProvider>
        <Spinner />
        <Toaster position="top-right" richColors />
        <TodoListScene />
      </TodoProvider>
    </LoadingProvider>
  )
}

export default App
