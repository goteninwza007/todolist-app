import TodoListScene from "./scenes/TodoList"
import { TodoProvider } from "./context/TodoContext"
import { LoadingProvider } from "./context/LoadingContext"
import Spinner from "./components/ui/Spinner"

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <TodoProvider>
        <Spinner />
        <TodoListScene />
      </TodoProvider>
    </LoadingProvider>
  )
}

export default App
