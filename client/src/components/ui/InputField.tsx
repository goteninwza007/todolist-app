type InputFieldProps = {
  name?: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const InputField: React.FC<InputFieldProps> = ({
  name,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <input
        id={name}
        name={name}
        className={`rounded-md border px-3 py-2 text-sm outline-none transition-colors
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          disabled:cursor-not-allowed disabled:opacity-50
          ${error ? "border-red-500" : "border-gray-300"}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default InputField