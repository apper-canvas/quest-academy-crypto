import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-12 text-center max-w-md">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            <ApperIcon name="AlertTriangle" size={64} className="text-error mx-auto mb-4" />
          </motion.div>
          
          <h2 className="font-display text-2xl text-gray-800 mb-4">Oops!</h2>
          <p className="text-gray-600 mb-6">{message}</p>
          
          {onRetry && (
            <Button onClick={onRetry} variant="primary">
              <ApperIcon name="RotateCcw" size={18} className="mr-2" />
              Try Again
            </Button>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

export default Error