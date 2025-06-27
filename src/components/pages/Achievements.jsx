import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import AchievementCard from '@/components/molecules/AchievementCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { getAchievements } from '@/services/api/achievementService'
import { useUserProgress } from '@/hooks/useUserProgress'

const Achievements = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const { userProgress } = useUserProgress()
  
  useEffect(() => {
    loadAchievements()
  }, [])
  
  const loadAchievements = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getAchievements()
      setAchievements(data)
    } catch (err) {
      setError('Failed to load achievements. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const isAchievementUnlocked = (achievementId) => {
    return userProgress.achievements.includes(achievementId)
  }
  
  const getAchievementProgress = (achievement) => {
    // Calculate progress based on achievement requirements
    const completedActivities = userProgress.completedActivities.length
    const totalXP = userProgress.totalXP
    const coins = userProgress.coins
    
    switch (achievement.requirement.type) {
      case 'complete_activities':
        return Math.min((completedActivities / achievement.requirement.count) * 100, 100)
      case 'earn_xp':
        return Math.min((totalXP / achievement.requirement.amount) * 100, 100)
      case 'collect_coins':
        return Math.min((coins / achievement.requirement.amount) * 100, 100)
      default:
        return 0
    }
  }
  
  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true
    if (filter === 'unlocked') return isAchievementUnlocked(achievement.id)
    if (filter === 'locked') return !isAchievementUnlocked(achievement.id)
    return true
  })
  
  const unlockedCount = achievements.filter(a => isAchievementUnlocked(a.id)).length
  
  if (loading) return <Loading type="cards" />
  if (error) return <Error message={error} onRetry={loadAchievements} />
  if (!achievements.length) return <Empty title="No achievements available" />
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-4xl text-gray-800 mb-4">🏆 Achievements</h1>
        <p className="text-xl text-gray-600 mb-6">
          Collect badges and rewards by completing challenges!
        </p>
        
        <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow-card">
          <div className="text-3xl font-display text-primary mb-2">
            {unlockedCount}/{achievements.length}
          </div>
          <div className="text-gray-600">Achievements Unlocked</div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
        </div>
      </motion.div>
      
      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {[
          { id: 'all', label: 'All', icon: 'Grid3X3' },
          { id: 'unlocked', label: 'Unlocked', icon: 'CheckCircle' },
          { id: 'locked', label: 'Locked', icon: 'Lock' }
        ].map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              filter === filterOption.id
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-card'
            }`}
          >
            <ApperIcon name={filterOption.icon} size={18} />
            {filterOption.label}
          </button>
        ))}
      </div>
      
      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <AchievementCard
              achievement={achievement}
              unlocked={isAchievementUnlocked(achievement.id)}
              progress={getAchievementProgress(achievement)}
            />
          </motion.div>
        ))}
      </div>
      
      {filteredAchievements.length === 0 && (
        <Empty 
          title="No achievements found"
          message="Try changing the filter or complete more activities!"
          icon="Trophy"
        />
      )}
    </div>
  )
}

export default Achievements