import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const AchievementCard = ({ 
  achievement, 
  unlocked = false,
  progress = 0,
  className = ''
}) => {
  const { name, description, icon, reward } = achievement
  
  return (
    <Card className={`p-4 ${unlocked ? 'bg-gradient-to-br from-success/10 to-green-50' : 'opacity-60'} ${className}`}>
      <div className="flex items-start gap-4">
        <motion.div 
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            unlocked 
              ? 'bg-gradient-to-r from-success to-green-500' 
              : 'bg-gray-200'
          }`}
          animate={unlocked ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.5, repeat: unlocked ? 3 : 0 }}
        >
          <ApperIcon 
            name={icon} 
            size={24} 
            className={unlocked ? 'text-white' : 'text-gray-400'} 
          />
        </motion.div>
        
        <div className="flex-1">
          <h3 className="font-display text-base text-gray-800 mb-1">{name}</h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          
          {!unlocked && progress > 0 && (
            <div className="mb-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Badge variant={unlocked ? 'success' : 'secondary'} size="sm">
              {unlocked ? 'Unlocked' : 'Locked'}
            </Badge>
            <div className="flex items-center gap-1">
              <ApperIcon name="Coins" size={16} className="text-accent" />
              <span className="text-sm font-semibold text-accent">{reward}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AchievementCard