import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import ApperIcon from '@/components/ApperIcon'
import { useUserProgress } from '@/hooks/useUserProgress'

const ReadingGame = ({ activity, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(activity.timeLimit)
  const { updateProgress } = useUserProgress()
  
  const question = activity.questions[currentQuestion]
  
  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleComplete()
    }
  }, [timeLeft, showFeedback])
  
  const handleSubmit = () => {
    const correct = selectedAnswer === question.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)
    
    if (correct) {
      setScore(score + 1)
      toast.success(`Correct! Well done! 🎉`)
    } else {
      toast.error(`Not quite right. The correct answer is "${question.correctAnswer}"`)
    }
    
    setTimeout(() => {
      setShowFeedback(false)
      if (currentQuestion + 1 < activity.questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer('')
      } else {
        handleComplete()
      }
    }, 2000)
  }
  
  const handleComplete = () => {
    const percentage = (score / activity.questions.length) * 100
    const passed = percentage >= 70
    
    if (passed) {
      const xpGained = activity.rewards.xp
      const coinsGained = activity.rewards.coins
      
      updateProgress({
        xp: xpGained,
        coins: coinsGained,
        completedActivity: activity.id
      })
      
      toast.success(`Story Complete! +${xpGained} XP, +${coinsGained} coins! 📚`)
    }
    
    onComplete({ score, percentage, passed })
  }
  
  if (showFeedback) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center justify-center min-h-[400px]"
      >
        <Card className="p-12 text-center">
          <motion.div
            animate={{ 
              rotate: isCorrect ? [0, 10, -10, 0] : [0, -5, 5, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 0.5 }}
          >
            <ApperIcon 
              name={isCorrect ? 'CheckCircle' : 'XCircle'} 
              size={64} 
              className={isCorrect ? 'text-success' : 'text-error'} 
            />
          </motion.div>
          <h2 className="font-display text-2xl mt-4 text-gray-800">
            {isCorrect ? 'Perfect!' : 'Good Try!'}
          </h2>
        </Card>
      </motion.div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {activity.questions.length}
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-400 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / activity.questions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ApperIcon name="Clock" size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-600">{timeLeft}s</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Story/Passage */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <ApperIcon name="BookOpen" size={24} className="text-pink-500" />
            <h3 className="font-display text-lg text-gray-800">Story</h3>
          </div>
          <div className="prose prose-lg">
            <p className="text-gray-700 leading-relaxed">{question.passage}</p>
          </div>
        </Card>
        
        {/* Question */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <ApperIcon name="HelpCircle" size={24} className="text-primary" />
              <h3 className="font-display text-lg text-gray-800">Question</h3>
            </div>
            
            <p className="text-gray-800 font-medium mb-6">{question.question}</p>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === option
                        ? 'border-primary bg-primary'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === option && (
                        <ApperIcon name="Check" size={14} className="text-white" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
            
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedAnswer}
              size="lg"
              className="w-full mt-6"
            >
              Submit Answer
            </Button>
          </Card>
        </motion.div>
      </div>
      
      {/* Score */}
      <div className="text-center mt-6">
        <span className="text-lg font-semibold text-gray-700">
          Score: {score}/{activity.questions.length}
        </span>
      </div>
    </div>
  )
}

export default ReadingGame