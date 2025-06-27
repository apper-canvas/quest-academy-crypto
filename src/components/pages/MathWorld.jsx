import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DailyChallengeModal from "@/components/molecules/DailyChallengeModal";
import { useUserProgress } from "@/hooks/useUserProgress";
import { getMathActivities } from "@/services/api/activityService";
import ApperIcon from "@/components/ApperIcon";
import GameCard from "@/components/molecules/GameCard";
import MathGame from "@/components/organisms/MathGame";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const MathWorld = () => {
const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [gameResults, setGameResults] = useState(null)
  const [showChallenge, setShowChallenge] = useState(false)
  const navigate = useNavigate()
  const { userProgress } = useUserProgress()
  useEffect(() => {
    loadActivities()
  }, [])
  
  const loadActivities = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getMathActivities()
      setActivities(data)
    } catch (err) {
      setError('Failed to load math activities. Please try again.')
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
  if (!activities.length) return <Empty title="No math games available" onAction={() => navigate('/')} />
  
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
            Back to Math World
          </Button>
        </div>
        
        <MathGame 
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
                name={gameResults.passed ? 'Trophy' : 'Target'} 
                size={80} 
                className={`mx-auto mb-6 ${gameResults.passed ? 'text-success' : 'text-accent'}`} 
              />
            </motion.div>
            
            <h2 className="font-display text-3xl text-gray-800 mb-4">
              {gameResults.passed ? 'Level Complete!' : 'Good Try!'}
            </h2>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-display text-primary mb-1">
                    {gameResults.score}
                  </div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div>
                  <div className="text-2xl font-display text-secondary mb-1">
                    {Math.round(gameResults.percentage)}%
                  </div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                </div>
              </div>
            </div>
            
            {gameResults.passed ? (
              <p className="text-gray-600 mb-8">
                Excellent work! You've mastered this level and unlocked new challenges!
              </p>
            ) : (
              <p className="text-gray-600 mb-8">
                Keep practicing! You need 70% to pass this level. Try again!
              </p>
            )}
            
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setGameResults(null)}>
                Back to Games
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Mountain Background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-200/50 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-blue-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-purple-300/30 rounded-full blur-2xl" />
      
<div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="font-display text-4xl md:text-5xl text-gray-800">
              🏔️ Math Mountain
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowChallenge(true)}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 text-sm"
            >
              <ApperIcon name="Star" size={16} className="sparkle-animation" />
              Daily Challenge
            </motion.button>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Climb to the peak by solving math problems! Each level gets more challenging.
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
                icon="Calculator"
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
      
      <DailyChallengeModal
        isOpen={showChallenge}
        onClose={() => setShowChallenge(false)}
        world="math"
      />
    </div>
  )
}

export default MathWorld