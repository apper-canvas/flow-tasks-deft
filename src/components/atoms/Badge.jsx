import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  children, 
  variant = "default", 
  size = "md",
  className,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-all duration-200"
  
  const variants = {
    default: "bg-gray-100 text-gray-800 border border-gray-200",
    primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-sm",
    success: "bg-gradient-to-r from-success to-emerald-600 text-white shadow-sm",
    warning: "bg-gradient-to-r from-warning to-orange-500 text-white shadow-sm",
    error: "bg-gradient-to-r from-error to-red-600 text-white shadow-sm",
    high: "priority-high shadow-sm",
    medium: "priority-medium shadow-sm",
    low: "priority-low shadow-sm"
  }
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  }

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge