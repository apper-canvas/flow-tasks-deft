import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  loading = false,
  disabled = false,
  className,
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] hover:scale-[1.02]"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-secondary/90 focus:ring-primary/50",
    secondary: "bg-white text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 hover:border-gray-400 hover:shadow-md focus:ring-gray-500/50",
    danger: "bg-gradient-to-r from-error to-red-600 text-white shadow-lg hover:shadow-xl hover:from-error/90 hover:to-red-600/90 focus:ring-error/50",
    success: "bg-gradient-to-r from-success to-emerald-600 text-white shadow-lg hover:shadow-xl hover:from-success/90 hover:to-emerald-600/90 focus:ring-success/50",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500/50",
    link: "text-primary hover:text-secondary underline-offset-4 hover:underline p-0 h-auto font-normal focus:ring-primary/50"
  }
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    xl: "h-14 px-8 text-lg"
  }

  const renderIcon = (position) => {
    if (!icon || iconPosition !== position) return null
    
    if (loading && position === "left") {
      return <ApperIcon name="Loader2" size={size === "sm" ? 14 : size === "lg" ? 20 : 16} className="animate-spin mr-2" />
    }
    
    const iconSize = size === "sm" ? 14 : size === "lg" ? 20 : 16
    const marginClass = position === "left" ? "mr-2" : "ml-2"
    
    return <ApperIcon name={icon} size={iconSize} className={marginClass} />
  }

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {renderIcon("left")}
      {children}
      {renderIcon("right")}
    </button>
  )
})

Button.displayName = "Button"

export default Button