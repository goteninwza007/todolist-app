type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'custom'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

type ButtonProps = {
  label: string
  onClick?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white rounded-md',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md',
  danger: 'bg-red-500 hover:bg-red-600 text-white rounded-md',
  custom: '',
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-4 py-1.5 text-xs',
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {label}
    </button>
  )
}

export default Button
