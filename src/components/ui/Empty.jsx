import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = 'Nothing here yet!', 
  message = 'Start your learning adventure by playing some games!',
  icon = 'Compass',
  actionLabel = 'Explore Worlds',
  onAction
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-12 text-center max-w-md">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto">
              <ApperIcon name={icon} size={48} className="text-primary" />
            </div>
          </motion.div>
          
          <h2 className="font-display text-2xl text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600 mb-8">{message}</p>
          
          {onAction && (
            <Button onClick={onAction} size="lg">
              <ApperIcon name="Sparkles" size={18} className="mr-2" />
              {actionLabel}
            </Button>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

export default Empty