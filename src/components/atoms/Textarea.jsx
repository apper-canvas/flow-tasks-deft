import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Textarea = forwardRef(({ 
  label,
  error,
  helper,
  rows = 3,
  className,
  containerClassName,
  ...props 
}, ref) => {
  const baseStyles = "flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-y"
  
  const errorStyles = error ? "border-error focus:ring-error" : ""

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={cn(baseStyles, errorStyles, className)}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
      {helper && !error && (
        <p className="text-sm text-gray-500">{helper}</p>
      )}
    </div>
  )
})

Textarea.displayName = "Textarea"

export default Textarea