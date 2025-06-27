import { motion } from 'framer-motion'
import WorldSelector from '@/components/organisms/WorldSelector'
import XPDisplay from '@/components/molecules/XPDisplay'
import { useUserProgress } from '@/hooks/useUserProgress'

const WorldMap = () => {
  const { userProgress } = useUserProgress()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-accent/30 to-orange-300/30 rounded-full blur-xl float-animation" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-xl float-animation" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-gradient-to-r from-pink-300/30 to-purple-300/30 rounded-full blur-xl float-animation" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-4 pt-12 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-6xl text-gray-800 mb-4">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Quest Academy
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your adventure and start learning through fun games and exciting challenges!
          </p>
        </motion.div>
        
        <div className="max-w-md mx-auto mb-12">
          <XPDisplay
            currentXP={userProgress.totalXP}
            level={userProgress.level}
            xpToNextLevel={1000}
          />
        </div>
        
        <WorldSelector />
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-card">
            <div className="text-3xl font-display text-primary mb-2">
              {userProgress.completedActivities.length}
            </div>
            <div className="text-gray-600">Games Completed</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-card">
            <div className="text-3xl font-display text-secondary mb-2">
              {userProgress.achievements.length}
            </div>
            <div className="text-gray-600">Achievements Earned</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-card">
            <div className="text-3xl font-display text-accent mb-2">
              {Math.floor((userProgress.completedActivities.length / 10) * 100)}%
            </div>
            <div className="text-gray-600">Total Progress</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WorldMap