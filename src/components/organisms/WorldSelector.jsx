import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import ProgressBar from '@/components/molecules/ProgressBar'
import ApperIcon from '@/components/ApperIcon'
import { useUserProgress } from '@/hooks/useUserProgress'

const WorldSelector = () => {
  const navigate = useNavigate()
  const { userProgress } = useUserProgress()
  
  const worlds = [
    {
      id: 'math',
      name: 'Math Mountain',
      description: 'Climb to the peak with numbers and equations!',
      icon: 'Calculator',
      path: '/math',
      color: 'from-blue-400 to-purple-500',
      completedLevels: userProgress.completedActivities.filter(a => a.type === 'math').length,
      totalLevels: 5
    },
    {
      id: 'reading',
      name: 'Reading Rainbow',
      description: 'Journey through stories and words!',
      icon: 'BookOpen',
      path: '/reading',
      color: 'from-pink-400 to-red-500',
      completedLevels: userProgress.completedActivities.filter(a => a.type === 'reading').length,
      totalLevels: 5
    }
  ]
  
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {worlds.map((world, index) => (
        <motion.div
          key={world.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Card className="p-0 overflow-hidden" onClick={() => navigate(world.path)}>
            <div className={`h-32 bg-gradient-to-r ${world.color} relative flex items-center justify-center`}>
              <motion.div
                className="absolute inset-0 bg-black/20"
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ApperIcon name={world.icon} size={48} className="text-white" />
              </motion.div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 left-4 w-4 h-4 bg-white/30 rounded-full float-animation" />
              <div className="absolute bottom-6 right-6 w-3 h-3 bg-white/40 rounded-full float-animation" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 right-8 w-2 h-2 bg-white/50 rounded-full float-animation" style={{ animationDelay: '2s' }} />
            </div>
            
            <div className="p-6">
              <h2 className="font-display text-2xl text-gray-800 mb-2">{world.name}</h2>
              <p className="text-gray-600 mb-4">{world.description}</p>
              
              <ProgressBar
                current={world.completedLevels}
                max={world.totalLevels}
                label="Progress"
                className="mb-4"
              />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {world.completedLevels}/{world.totalLevels} levels completed
                </span>
                <Button size="sm">
                  Enter World
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default WorldSelector