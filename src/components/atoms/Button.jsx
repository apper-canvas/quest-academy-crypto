import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-game hover:shadow-celebration',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white',
    accent: 'bg-gradient-to-r from-accent to-orange-400 text-white shadow-lg hover:shadow-xl',
    success: 'bg-gradient-to-r from-success to-green-500 text-white shadow-lg hover:shadow-xl',
    ghost: 'bg-transparent text-primary hover:bg-primary/10'
  }
  
  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
    xl: 'py-5 px-10 text-xl'
  }
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button