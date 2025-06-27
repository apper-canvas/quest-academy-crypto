import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Avatar = ({ 
  avatar = {}, 
  size = 'md', 
  className = '',
  animated = false,
  ...props 
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32'
  }
  
  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
    '2xl': 64
  }
  
  const baseClasses = `${sizes[size]} rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-3 border-white shadow-lg flex items-center justify-center overflow-hidden ${className}`
  
  const avatarContent = (
    <div className={baseClasses} {...props}>
      {avatar.face ? (
        <span className="text-2xl">{avatar.face}</span>
      ) : (
        <ApperIcon 
          name="User" 
          size={iconSizes[size]} 
          className="text-primary"
        />
      )}
    </div>
  )
  
  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {avatarContent}
      </motion.div>
    )
  }
  
  return avatarContent
}

export default Avatar