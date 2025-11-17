import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  checked = false,
  onChange,
  label,
  error,
  disabled = false,
  size = "md",
  className,
  containerClassName,
  ...props 
}, ref) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  }

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20
  }

  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e.target.checked, e)
    }
  }

  return (
    <div className={cn("flex items-center space-x-2", containerClassName)}>
      <div className="relative flex items-center">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            sizes[size],
            "rounded border-2 cursor-pointer transition-all duration-200 flex items-center justify-center",
            checked 
              ? "bg-gradient-to-r from-primary to-secondary border-primary shadow-lg scale-110" 
              : "border-gray-300 hover:border-gray-400 bg-white hover:shadow-md",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          onClick={() => !disabled && handleChange({ target: { checked: !checked } })}
        >
          {checked && (
            <ApperIcon 
              name="Check" 
              size={iconSizes[size]} 
              className="text-white animate-bounce-in" 
            />
          )}
        </div>
      </div>
      
      {label && (
        <label 
          className={cn(
            "text-sm cursor-pointer select-none",
            disabled ? "text-gray-400" : "text-gray-700 hover:text-gray-900",
            checked && "font-medium"
          )}
          onClick={() => !disabled && handleChange({ target: { checked: !checked } })}
        >
          {label}
        </label>
      )}
      
      {error && (
        <p className="text-sm text-error ml-7">{error}</p>
      )}
    </div>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox