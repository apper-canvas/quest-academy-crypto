import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import ProgressBar from '@/components/molecules/ProgressBar'
import { useState, useEffect } from 'react'

const XPDisplay = ({ currentXP, level, xpToNextLevel, previousXP = currentXP }) => {
  const [showGain, setShowGain] = useState(false)
  const gain = currentXP - previousXP
  
  useEffect(() => {
    if (gain > 0) {
      setShowGain(true)
      setTimeout(() => setShowGain(false), 2000)
    }
  }, [gain])
  
  return (
    <div className="relative bg-white rounded-2xl p-4 shadow-card">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-full">
          <ApperIcon name="Zap" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-display text-lg text-gray-800">Level {level}</h3>
          <p className="text-sm text-gray-600">{currentXP.toLocaleString()} XP</p>
        </div>
      </div>
      
      <ProgressBar
        current={currentXP % xpToNextLevel}
        max={xpToNextLevel}
        label="Progress to Next Level"
        color="primary"
        size="lg"
      />
      
      <AnimatePresence>
        {showGain && gain > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.8 }}
            className="absolute -top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
          >
            +{gain} XP
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default XPDisplay