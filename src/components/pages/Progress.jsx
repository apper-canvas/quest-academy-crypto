import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/atoms/Card'
import ProgressBar from '@/components/molecules/ProgressBar'
import XPDisplay from '@/components/molecules/XPDisplay'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { useUserProgress } from '@/hooks/useUserProgress'

const Progress = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { userProgress } = useUserProgress()
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])
  
  const mathProgress = userProgress.completedActivities.filter(a => a.type === 'math').length
  const readingProgress = userProgress.completedActivities.filter(a => a.type === 'reading').length
  const totalActivities = 10 // 5 math + 5 reading
  const overallProgress = Math.round((userProgress.completedActivities.length / totalActivities) * 100)
  
  const stats = [
    {
      title: 'Total XP',
      value: userProgress.totalXP.toLocaleString(),
      icon: 'Zap',
      color: 'text-primary',
      bgColor: 'from-primary/20 to-primary/10'
    },
    {
      title: 'Current Level',
      value: userProgress.level,
      icon: 'Star',
      color: 'text-secondary',
      bgColor: 'from-secondary/20 to-secondary/10'
    },
    {
      title: 'Coins Earned',
      value: userProgress.coins.toLocaleString(),
      icon: 'Coins',
      color: 'text-accent',
      bgColor: 'from-accent/20 to-accent/10'
    },
    {
      title: 'Achievements',
      value: userProgress.achievements.length,
      icon: 'Trophy',
      color: 'text-success',
      bgColor: 'from-success/20 to-success/10'
    }
  ]
  
  const recentActivities = userProgress.completedActivities
    .slice(-5)
    .reverse()
  
  if (loading) return <Loading />
  if (error) return <Error message={error} />
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-4xl text-gray-800 mb-4">📊 My Progress</h1>
        <p className="text-xl text-gray-600">
          Track your learning journey and see how far you've come!
        </p>
      </motion.div>
      
      {/* XP Display */}
      <div className="max-w-md mx-auto mb-8">
        <XPDisplay
          currentXP={userProgress.totalXP}
          level={userProgress.level}
          xpToNextLevel={1000}
        />
      </div>
      
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <ApperIcon name={stat.icon} size={32} className={stat.color} />
              </div>
              <div className={`text-3xl font-display ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Progress Sections */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Subject Progress */}
        <Card className="p-6">
          <h2 className="font-display text-2xl text-gray-800 mb-6">Subject Progress</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <ApperIcon name="Calculator" size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-700">Math Mountain</span>
              </div>
              <ProgressBar
                current={mathProgress}
                max={5}
                label={`${mathProgress}/5 levels completed`}
                color="primary"
              />
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center">
                  <ApperIcon name="BookOpen" size={16} className="text-white" />
                </div>
                <span className="font-medium text-gray-700">Reading Rainbow</span>
              </div>
              <ProgressBar
                current={readingProgress}
                max={5}
                label={`${readingProgress}/5 levels completed`}
                color="secondary"
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-display text-primary mb-1">
                {overallProgress}%
              </div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
          </div>
        </Card>
        
        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="font-display text-2xl text-gray-800 mb-6">Recent Activity</h2>
          
          {recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={`${activity.id}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'math' 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500' 
                      : 'bg-gradient-to-r from-pink-400 to-red-500'
                  }`}>
                    <ApperIcon 
                      name={activity.type === 'math' ? 'Calculator' : 'BookOpen'} 
                      size={20} 
                      className="text-white" 
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{activity.title}</div>
                    <div className="text-sm text-gray-600">
                      {activity.type === 'math' ? 'Math Mountain' : 'Reading Rainbow'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-success">
                      <ApperIcon name="CheckCircle" size={16} />
                      <span className="text-sm font-medium">Complete</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <Empty 
              title="No activities yet"
              message="Start playing games to see your progress here!"
              icon="PlayCircle"
            />
          )}
        </Card>
      </div>
      
      {/* Learning Streak */}
      <Card className="p-6 text-center">
        <h2 className="font-display text-2xl text-gray-800 mb-4">Learning Streak</h2>
        <div className="flex items-center justify-center gap-8">
          <div>
            <div className="text-4xl font-display text-accent mb-2">🔥</div>
            <div className="text-2xl font-display text-accent mb-1">
              {Math.max(1, Math.floor(userProgress.completedActivities.length / 2))}
            </div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div>
            <div className="text-4xl font-display text-primary mb-2">⭐</div>
            <div className="text-2xl font-display text-primary mb-1">
              {userProgress.completedActivities.length}
            </div>
            <div className="text-sm text-gray-600">Games Completed</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Progress