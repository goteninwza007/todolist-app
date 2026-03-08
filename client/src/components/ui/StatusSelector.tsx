import { useState, useRef, useEffect } from "react"
import type { Status } from "../../types/todo"

const statusConfig: Record<Status, { label: string; dot: string; color: string }> = {
  todo: { label: "To Do", dot: "bg-slate-400", color: "text-slate-500" },
  in_progress: { label: "In Progress", dot: "bg-blue-500", color: "text-blue-600" },
  done: { label: "Done", dot: "bg-green-500", color: "text-green-600" },
}

const bgConfig: Record<Status, string> = {
  todo: "bg-white border-slate-200",
  in_progress: "bg-blue-50 border-blue-200",
  done: "bg-green-50 border-green-200",
}

type StatusSelectorProps = {
  value: Status
  onChange: (status: Status) => void
}

const StatusSelector: React.FC<StatusSelectorProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const current = statusConfig[value]

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-between gap-8 px-3 py-2 rounded-lg border text-sm font-medium min-w-36 transition-all ${bgConfig[value]} ${current.color}`}
      >
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${current.dot}`} />
          {current.label}
        </div>
        <span className="text-slate-400 text-xs">{isOpen ? "▴" : "▾"}</span>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden min-w-36">
          {(Object.keys(statusConfig) as Status[]).map((s) => {
            const config = statusConfig[s]
            const isActive = s === value
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  onChange(s)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors
                  ${isActive ? "bg-slate-50" : "hover:bg-slate-50"}
                  ${config.color}`}
              >
                <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                {config.label}
                {isActive && <span className="ml-auto text-indigo-500 text-xs">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default StatusSelector