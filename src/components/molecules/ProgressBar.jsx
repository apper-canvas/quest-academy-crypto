import { motion } from 'framer-motion'

const ProgressBar = ({ 
  current, 
  max, 
  label, 
  showValue = true, 
  size = 'md',
  color = 'primary',
  className = '',
  animated = true
}) => {
  const percentage = Math.min((current / max) * 100, 100)
  
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6'
  }
  
  const colors = {
    primary: 'from-primary to-secondary',
    accent: 'from-accent to-orange-400',
    success: 'from-success to-green-500'
  }
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && (
            <span className="text-sm font-semibold text-gray-600">
              {current}/{max}
            </span>
          )}
        </div>
      )}
      
      <div className={`progress-bar ${sizes[size]}`}>
        <motion.div
          className={`progress-fill bg-gradient-to-r ${colors[color]}`}
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      
      {showValue && !label && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  )
}

export default ProgressBar