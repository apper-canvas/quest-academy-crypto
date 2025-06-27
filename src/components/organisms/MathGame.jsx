import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { useUserProgress } from "@/hooks/useUserProgress";

const MathGame = ({ activity, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(activity.timeLimit)
  const { updateProgress } = useUserProgress()
  
  const question = activity.questions[currentQuestion]
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      handleComplete()
    }
  }, [timeLeft])
  
  const handleSubmit = () => {
    const correct = parseInt(userAnswer) === question.answer
    setIsCorrect(correct)
    setShowFeedback(true)
    
    if (correct) {
      setScore(score + 1)
      toast.success(`Correct! Great job! 🎉`)
    } else {
      toast.error(`Not quite right. The answer is ${question.answer}`)
    }
    
    setTimeout(() => {
      setShowFeedback(false)
      if (currentQuestion + 1 < activity.questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setUserAnswer('')
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
      
      toast.success(`Level Complete! +${xpGained} XP, +${coinsGained} coins! 🏆`)
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
            {isCorrect ? 'Excellent!' : 'Keep Trying!'}
          </h2>
        </Card>
      </motion.div>
    )
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {activity.questions.length}
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / activity.questions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ApperIcon name="Clock" size={16} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-600">{timeLeft}s</span>
        </div>
      </div>
      
      {/* Question */}
      <Card className="p-8 text-center mb-6">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-display text-3xl text-gray-800 mb-8">
            {question.question}
          </h2>
          
          {question.visual && (
            <div className="flex justify-center gap-2 mb-8">
              {Array.from({ length: question.visual }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-8 h-8 bg-gradient-to-r from-accent to-orange-400 rounded-full"
                />
              ))}
            </div>
          )}
          
          <div className="flex justify-center mb-6">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-32 h-16 text-2xl text-center border-3 border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/20"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && userAnswer && handleSubmit()}
            />
          </div>
          
          <Button 
            onClick={handleSubmit} 
            disabled={!userAnswer}
            size="lg"
            className="px-12"
          >
            Submit Answer
          </Button>
        </motion.div>
      </Card>
      
      {/* Score */}
      <div className="text-center">
        <span className="text-lg font-semibold text-gray-700">
          Score: {score}/{activity.questions.length}
        </span>
      </div>
    </div>
  )
}

export default MathGame