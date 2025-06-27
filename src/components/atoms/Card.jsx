import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hoverable = true, 
  gradient = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-200'
  const backgroundClasses = gradient 
    ? 'bg-gradient-to-br from-white to-purple-50' 
    : 'bg-white'
  const shadowClasses = 'shadow-card'
  const hoverClasses = hoverable 
    ? 'hover:shadow-game cursor-pointer' 
    : ''
  
  const cardClasses = `${baseClasses} ${backgroundClasses} ${shadowClasses} ${hoverClasses} ${className}`
  
  if (onClick) {
    return (
      <motion.div
        whileHover={hoverable ? { scale: 1.02, y: -2 } : {}}
        whileTap={hoverable ? { scale: 0.98 } : {}}
        className={cardClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  )
}

export default Card