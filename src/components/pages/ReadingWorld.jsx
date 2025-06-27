import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import GameCard from '@/components/molecules/GameCard'
import ReadingGame from '@/components/organisms/ReadingGame'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { getReadingActivities } from '@/services/api/activityService'
import { useUserProgress } from '@/hooks/useUserProgress'

const ReadingWorld = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [gameResults, setGameResults] = useState(null)
  const navigate = useNavigate()
  const { userProgress } = useUserProgress()
  
  useEffect(() => {
    loadActivities()
  }, [])
  
  const loadActivities = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getReadingActivities()
      setActivities(data)
    } catch (err) {
      setError('Failed to load reading activities. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity)
    setGameResults(null)
  }
  
  const handleGameComplete = (results) => {
    setGameResults(results)
    setSelectedActivity(null)
  }
  
  const isActivityCompleted = (activityId) => {
    return userProgress.completedActivities.some(a => a.id === activityId)
  }
  
  const isActivityLocked = (activity, index) => {
    return index > 0 && !isActivityCompleted(activities[index - 1]?.id)
  }
  
  if (loading) return <Loading type="game" />
  if (error) return <Error message={error} onRetry={loadActivities} />
  if (!activities.length) return <Empty title="No reading games available" onAction={() => navigate('/')} />
  
  if (selectedActivity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedActivity(null)}
            className="flex items-center gap-2"
          >
            <ApperIcon name="ArrowLeft" size={20} />
            Back to Reading World
          </Button>
        </div>
        
        <ReadingGame 
          activity={selectedActivity} 
          onComplete={handleGameComplete}
        />
      </div>
    )
  }
  
  if (gameResults) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="p-12 text-center">
            <motion.div
              animate={{ 
                rotate: gameResults.passed ? [0, 10, -10, 0] : [0, -5, 5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 0.8 }}
            >
              <ApperIcon 
                name={gameResults.passed ? 'BookOpen' : 'Book'} 
                size={80} 
                className={`mx-auto mb-6 ${gameResults.passed ? 'text-success' : 'text-accent'}`} 
              />
            </motion.div>
            
            <h2 className="font-display text-3xl text-gray-800 mb-4">
              {gameResults.passed ? 'Story Complete!' : 'Keep Reading!'}
            </h2>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-display text-pink-500 mb-1">
                    {gameResults.score}
                  </div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div>
                  <div className="text-2xl font-display text-red-500 mb-1">
                    {Math.round(gameResults.percentage)}%
                  </div>
                  <div className="text-sm text-gray-600">Comprehension</div>
                </div>
              </div>
            </div>
            
            {gameResults.passed ? (
              <p className="text-gray-600 mb-8">
                Amazing reading skills! You understood the story perfectly!
              </p>
            ) : (
              <p className="text-gray-600 mb-8">
                Good effort! Read more carefully and try again to pass with 70%!
              </p>
            )}
            
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setGameResults(null)}>
                Back to Stories
              </Button>
              <Button variant="secondary" onClick={() => navigate('/')}>
                World Map
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-orange-100 relative overflow-hidden">
      {/* Rainbow Background */}
      <div className="absolute top-20 left-0 right-0 h-32 bg-gradient-to-r from-pink-200/30 via-red-200/30 to-orange-200/30 blur-3xl" />
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-pink-300/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-red-300/20 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl text-gray-800 mb-4">
            🌈 Reading Rainbow
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Journey through magical stories and improve your reading skills with every adventure!
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GameCard
                title={activity.title}
                description={activity.description}
                difficulty={activity.difficulty}
                icon="BookOpen"
                completed={isActivityCompleted(activity.id)}
                locked={isActivityLocked(activity, index)}
                onClick={() => !isActivityLocked(activity, index) && handleActivitySelect(activity)}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="secondary" onClick={() => navigate('/')}>
            <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
            Back to World Map
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReadingWorld