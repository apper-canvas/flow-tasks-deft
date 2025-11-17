import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const Sidebar = ({ 
  lists = [], 
  activeListId, 
  onSelectList, 
  taskCounts = {},
  className 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const totalTasks = taskCounts.all || 0
  const completedTasks = taskCounts.completed || 0
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const getListTaskCount = (listId) => {
    const listName = listId.toLowerCase()
    return taskCounts[listName] || 0
  }

  const listItems = [
    {
      id: "all",
      name: "All Tasks",
      icon: "List",
      color: "#6366f1",
      count: taskCounts.all || 0
    },
    ...lists.map(list => ({
      id: list.name.toLowerCase(),
      name: list.name,
      icon: list.name === "Work" ? "Briefcase" : 
            list.name === "Personal" ? "User" :
            list.name === "Shopping" ? "ShoppingCart" : "Folder",
      color: list.color,
      count: getListTaskCount(list.name.toLowerCase())
    }))
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col bg-surface border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-16" : "w-72",
        className
      )}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                    <ApperIcon name="CheckSquare" size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Flow Tasks
                    </h1>
                    <p className="text-xs text-gray-500 font-medium">
                      Streamlined productivity
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            >
              <ApperIcon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
          </div>
        </div>

        {/* Progress Summary */}
        {!isCollapsed && (
          <div className="p-6 border-b border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Today's Progress</span>
                <span className="text-sm font-bold text-primary">{completionRate}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-lg font-bold text-gray-900">{totalTasks}</div>
                  <div className="text-xs text-gray-500">Total Tasks</div>
                </div>
                <div className="bg-success/10 rounded-lg p-3">
                  <div className="text-lg font-bold text-success">{completedTasks}</div>
                  <div className="text-xs text-success">Completed</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Lists */}
        <nav className="flex-1 p-6 space-y-2">
          {listItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onSelectList(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 group",
                activeListId === item.id
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div 
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200",
                  activeListId === item.id
                    ? "bg-white/20"
                    : "bg-gray-100 group-hover:bg-gray-200"
                )}
                style={activeListId !== item.id ? { backgroundColor: `${item.color}15` } : {}}
              >
                <ApperIcon 
                  name={item.icon} 
                  size={16} 
                  className={cn(
                    activeListId === item.id 
                      ? "text-white" 
                      : "group-hover:opacity-80"
                  )}
                  style={activeListId !== item.id ? { color: item.color } : {}}
                />
              </div>
              
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex items-center justify-between min-w-0"
                  >
                    <span className="font-medium truncate">{item.name}</span>
                    {item.count > 0 && (
                      <span className={cn(
                        "text-xs font-bold px-2 py-1 rounded-full min-w-[1.25rem] text-center",
                        activeListId === item.id
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-600"
                      )}>
                        {item.count}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Stay focused, stay productive
              </p>
              <div className="mt-2 flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                <div className="w-1 h-1 bg-gradient-to-r from-secondary to-accent rounded-full"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-accent to-warning rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {/* Mobile implementation would go here */}
      </AnimatePresence>
    </>
  )
}

export default Sidebar