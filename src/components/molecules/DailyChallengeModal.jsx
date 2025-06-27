import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Loading from '@/components/ui/Loading'
import { getDailyChallenge, completeChallenge } from '@/services/api/challengeService'
import { useUserProgress } from '@/hooks/useUserProgress'
import { toast } from 'react-toastify'

const DailyChallengeModal = ({ isOpen, onClose, world }) => {
  const [challenge, setChallenge] = useState(null)
  const [loading, setLoading] = useState(false)
  const [completing, setCompleting] = useState(false)
  const { userProgress, updateProgress } = useUserProgress()
  
  const worldThemes = {
    math: {
      gradient: 'from-blue-500 to-purple-600',
      bgGradient: 'from-blue-100 via-purple-50 to-indigo-100',
      icon: 'Calculator',
      emoji: '🏔️',
      title: 'Math Mountain Challenge'
    },
    reading: {
      gradient: 'from-pink-500 to-red-500',
      bgGradient: 'from-pink-100 via-red-50 to-orange-100',
      icon: 'BookOpen',
      emoji: '🌈',
      title: 'Reading Rainbow Challenge'
    }
  }
  
  const theme = worldThemes[world] || worldThemes.math
  
  useEffect(() => {
    if (isOpen && world) {
      loadChallenge()
    }
  }, [isOpen, world])
  
  const loadChallenge = async () => {
    try {
      setLoading(true)
      const challengeData = await getDailyChallenge(world, userProgress)
      setChallenge(challengeData)
    } catch (error) {
      toast.error('Failed to load daily challenge')
      onClose()
    } finally {
      setLoading(false)
    }
  }
  
  const handleStartChallenge = () => {
    if (challenge?.activity) {
      // Simulate completing the challenge with random results
      handleCompleteChallenge()
    }
  }
  
  const handleCompleteChallenge = async () => {
    if (!challenge) return
    
    try {
      setCompleting(true)
      
      // Simulate challenge completion with random results
      const mockResults = {
        score: Math.floor(Math.random() * 5) + 3,
        total: 5,
        percentage: Math.floor(Math.random() * 30) + 70,
        passed: true
      }
      
      const completedChallenge = await completeChallenge(challenge.Id, mockResults)
      
      // Calculate rewards
      const baseXP = challenge.activity.rewards.xp
      const baseCoins = challenge.activity.rewards.coins
      const bonusXP = baseXP * challenge.bonusMultiplier
      const bonusCoins = baseCoins * challenge.bonusMultiplier
      
      // Update user progress
      await updateProgress({
        xp: bonusXP,
        coins: bonusCoins,
        specialItem: challenge.specialReward,
        challengeCompleted: challenge.Id
      })
      
      setChallenge(completedChallenge)
      
      toast.success(`🎉 Challenge completed! Earned ${bonusXP} XP and ${bonusCoins} coins!`)
      
    } catch (error) {
      toast.error('Failed to complete challenge')
    } finally {
      setCompleting(false)
    }
  }
  
  if (!isOpen) return null
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className={`relative bg-gradient-to-br ${theme.bgGradient} border-2 border-white/20 shadow-2xl`}>
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ApperIcon name="X" size={20} className="text-gray-700" />
            </button>
            
            <div className="p-8">
              {loading ? (
                <div className="text-center py-12">
                  <Loading type="game" />
                  <p className="text-gray-600 mt-4">Loading daily challenge...</p>
                </div>
              ) : challenge ? (
                <div className="text-center">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${theme.gradient} text-white shadow-lg mb-4`}>
                      <ApperIcon name="Star" size={24} className="sparkle-animation" />
                      <h2 className="font-display text-xl font-bold">Daily Challenge</h2>
                      <ApperIcon name="Star" size={24} className="sparkle-animation" />
                    </div>
                    
                    <h3 className="font-display text-2xl text-gray-800 mb-2">
                      {theme.emoji} {theme.title}
                    </h3>
                    
                    <p className="text-gray-600">
                      Complete today's special challenge for bonus rewards!
                    </p>
                  </motion.div>
                  
                  {challenge.completed ? (
                    /* Completed State */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white/60 rounded-2xl p-8 mb-6"
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 0.8 }}
                        className="mb-6"
                      >
                        <ApperIcon name="Trophy" size={80} className="mx-auto text-yellow-500" />
                      </motion.div>
                      
                      <h4 className="font-display text-2xl text-gray-800 mb-4">
                        Challenge Completed! 🎉
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-4">
                          <div className="text-2xl font-bold">{challenge.activity.rewards.xp * challenge.bonusMultiplier}</div>
                          <div className="text-sm opacity-90">Bonus XP</div>
                        </div>
                        <div className="bg-gradient-to-r from-accent to-orange-400 text-white rounded-xl p-4">
                          <div className="text-2xl font-bold">{challenge.activity.rewards.coins * challenge.bonusMultiplier}</div>
                          <div className="text-sm opacity-90">Bonus Coins</div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 mb-6">
                        <ApperIcon name="Gift" size={32} className="mx-auto text-yellow-600 mb-2" />
                        <div className="font-bold text-gray-800">Special Item Unlocked!</div>
                        <div className="text-sm text-gray-600 capitalize">{challenge.specialReward.replace('-', ' ')}</div>
                      </div>
                      
                      <p className="text-gray-600">
                        Come back tomorrow for a new challenge!
                      </p>
                    </motion.div>
                  ) : (
                    /* Challenge Details */
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/60 rounded-2xl p-8 mb-6"
                    >
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <ApperIcon name={theme.icon} size={48} className={`text-${world === 'math' ? 'blue' : 'pink'}-500`} />
                        <div className="text-left">
                          <h4 className="font-display text-xl text-gray-800">{challenge.activity.title}</h4>
                          <p className="text-gray-600 text-sm">{challenge.activity.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-3 mb-2">
                            <ApperIcon name="Zap" size={24} className="mx-auto mb-1" />
                            <div className="font-bold">{challenge.activity.rewards.xp * challenge.bonusMultiplier} XP</div>
                          </div>
                          <div className="text-sm text-gray-600">Bonus XP (2x)</div>
                        </div>
                        <div className="text-center">
                          <div className="bg-gradient-to-r from-accent to-orange-400 text-white rounded-xl p-3 mb-2">
                            <ApperIcon name="Coins" size={24} className="mx-auto mb-1" />
                            <div className="font-bold">{challenge.activity.rewards.coins * challenge.bonusMultiplier}</div>
                          </div>
                          <div className="text-sm text-gray-600">Bonus Coins (2x)</div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <ApperIcon name="Gift" size={20} className="text-yellow-600" />
                          <span className="font-bold text-gray-800">Special Reward</span>
                        </div>
                        <div className="text-sm text-gray-600 capitalize">{challenge.specialReward.replace('-', ' ')}</div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Actions */}
                  <div className="flex gap-4 justify-center">
                    {!challenge.completed && (
                      <Button
                        onClick={handleStartChallenge}
                        disabled={completing}
                        className={`bg-gradient-to-r ${theme.gradient} hover:opacity-90 text-white font-bold px-8 py-3`}
                      >
                        {completing ? (
                          <>
                            <ApperIcon name="Loader2" size={20} className="mr-2 animate-spin" />
                            Completing...
                          </>
                        ) : (
                          <>
                            <ApperIcon name="Play" size={20} className="mr-2" />
                            Start Challenge
                          </>
                        )}
                      </Button>
                    )}
                    
                    <Button variant="secondary" onClick={onClose}>
                      {challenge.completed ? 'Close' : 'Maybe Later'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ApperIcon name="AlertCircle" size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No challenge available right now.</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DailyChallengeModal