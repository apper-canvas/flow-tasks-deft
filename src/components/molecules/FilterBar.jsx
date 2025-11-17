import { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const FilterBar = ({ 
  activeFilter, 
  onFilterChange, 
  taskCounts = {},
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const filters = [
    {
      key: "all",
      label: "All Tasks",
      icon: "List",
      count: taskCounts.all || 0
    },
    {
      key: "today",
      label: "Due Today",
      icon: "Clock",
      count: taskCounts.today || 0,
      color: "text-warning"
    },
    {
      key: "overdue",
      label: "Overdue",
      icon: "AlertTriangle",
      count: taskCounts.overdue || 0,
      color: "text-error"
    },
    {
      key: "high",
      label: "High Priority",
      icon: "ArrowUp",
      count: taskCounts.high || 0,
      color: "text-error"
    },
    {
      key: "medium",
      label: "Medium Priority",
      icon: "Minus",
      count: taskCounts.medium || 0,
      color: "text-warning"
    },
    {
      key: "low",
      label: "Low Priority",
      icon: "ArrowDown",
      count: taskCounts.low || 0,
      color: "text-info"
    },
    {
      key: "completed",
      label: "Completed",
      icon: "CheckCircle",
      count: taskCounts.completed || 0,
      color: "text-success"
    }
  ]

  const activeFilters = filters.filter(f => f.count > 0 || f.key === "all")
  const visibleFilters = isExpanded ? activeFilters : activeFilters.slice(0, 4)
  const hasMore = activeFilters.length > 4

  return (
    <div className={cn("bg-surface rounded-xl shadow-sm border border-gray-200 p-4", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center">
          <ApperIcon name="Filter" size={16} className="mr-2 text-gray-500" />
          Filter Tasks
        </h3>
        
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs"
          >
            {isExpanded ? "Show Less" : "Show More"}
            <ApperIcon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={14} 
              className="ml-1" 
            />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {visibleFilters.map((filter) => (
          <Button
            key={filter.key}
            variant={activeFilter === filter.key ? "primary" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(filter.key)}
            className={cn(
              "flex items-center justify-between p-3 h-auto",
              activeFilter === filter.key 
                ? "shadow-lg" 
                : "hover:bg-gray-50 border border-gray-200"
            )}
          >
            <div className="flex items-center space-x-2">
              <ApperIcon 
                name={filter.icon} 
                size={16} 
                className={cn(
                  activeFilter === filter.key 
                    ? "text-white" 
                    : filter.color || "text-gray-500"
                )}
              />
              <span className="text-sm font-medium truncate">
                {filter.label}
              </span>
            </div>
            
            {filter.count > 0 && (
              <span className={cn(
                "text-xs font-bold px-2 py-1 rounded-full min-w-[1.5rem] text-center",
                activeFilter === filter.key
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-600"
              )}>
                {filter.count}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar