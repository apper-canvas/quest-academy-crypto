import { motion } from 'framer-motion'

const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  animate = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full'
  
const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white',
    accent: 'bg-gradient-to-r from-accent to-orange-400 text-white',
    success: 'bg-gradient-to-r from-success to-green-500 text-white',
    warning: 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white',
    secondary: 'bg-gray-100 text-gray-700',
    outline: 'border-2 border-primary text-primary bg-white'
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  const badgeClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  if (animate) {
    return (
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={badgeClasses}
        {...props}
      >
        {children}
      </motion.span>
    )
  }
  
  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  )
}

export default Badge