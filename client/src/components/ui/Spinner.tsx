import { useLoading } from '../../context/LoadingContext'

const Spinner: React.FC = () => {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-10 w-10 rounded-full border-[3px] border-slate-200 border-t-indigo-500"
          style={{ animation: 'spin 0.7s linear infinite' }}
        />
      </div>
    </div>
  )
}

export default Spinner
