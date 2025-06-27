import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const GameCard = ({ 
  title, 
  description, 
  difficulty, 
  icon, 
  completed = false,
  locked = false,
  onClick,
  className = ''
}) => {
  const difficultyColors = {
    1: 'success',
    2: 'accent', 
    3: 'secondary'
  }
  
  const difficultyLabels = {
    1: 'Easy',
    2: 'Medium',
    3: 'Hard'
  }
  
  if (locked) {
    return (
      <Card className={`p-6 opacity-50 cursor-not-allowed ${className}`} hoverable={false}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Lock" size={32} className="text-gray-400" />
          </div>
          <h3 className="font-display text-lg text-gray-400 mb-2">Locked</h3>
          <p className="text-sm text-gray-400">Complete previous levels to unlock</p>
        </div>
      </Card>
    )
  }
  
  return (
    <Card 
      className={`p-6 relative overflow-hidden ${className}`}
      onClick={onClick}
      gradient={completed}
    >
      {completed && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3"
        >
          <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
            <ApperIcon name="Check" size={16} className="text-white" />
          </div>
        </motion.div>
      )}
      
      <div className="text-center">
        <motion.div 
          className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4"
          whileHover={{ rotate: 10, scale: 1.1 }}
        >
          <ApperIcon name={icon} size={32} className="text-primary" />
        </motion.div>
        
        <h3 className="font-display text-lg text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        
        <Badge variant={difficultyColors[difficulty]} size="sm">
          {difficultyLabels[difficulty]}
        </Badge>
      </div>
    </Card>
  )
}

export default GameCard