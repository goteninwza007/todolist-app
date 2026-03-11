import { useState, useRef, useEffect } from 'react'

type SelectFieldOption = {
  value: string
  label: string
}

type SelectFieldProps = {
  value: string
  label?: string
  options: SelectFieldOption[]
  onChange: (value: string) => void
  className?: string
  error?: string
}

const SelectField: React.FC<SelectFieldProps> = ({
  value,
  label,
  options,
  onChange,
  className = '',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current = options.find((o) => o.value === value)

  return (
    <div ref={ref} className={`relative ${className}`}>
      {label && (
        <label className="text-xs font-medium text-slate-500 mb-1 block">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm font-medium transition-all hover:border-slate-300 focus:outline-none
          ${
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400'
              : 'border-slate-200 bg-white text-slate-600 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400'
          }`}
      >
        <span className={value ? 'text-slate-600' : 'text-slate-400'}>
          {current?.label ?? 'Select...'}
        </span>
        <span className="text-slate-400 text-xs">{isOpen ? '▴' : '▾'}</span>
      </button>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
          {options.map((opt) => {
            const isActive = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium transition-colors
                  ${isActive ? 'bg-slate-50 text-slate-700' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {opt.label}
                {isActive && <span className="text-indigo-500 text-xs">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SelectField
