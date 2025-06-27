import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { useState, useEffect } from 'react'

const CoinDisplay = ({ coins, previousCoins = coins, size = 'md' }) => {
  const [showGain, setShowGain] = useState(false)
  const gain = coins - previousCoins
  
  useEffect(() => {
    if (gain > 0) {
      setShowGain(true)
      setTimeout(() => setShowGain(false), 2000)
    }
  }, [gain])
  
  const sizes = {
    sm: { icon: 16, text: 'text-sm', container: 'px-2 py-1' },
    md: { icon: 20, text: 'text-base', container: 'px-3 py-1.5' },
    lg: { icon: 24, text: 'text-lg', container: 'px-4 py-2' }
  }
  
  return (
    <div className="relative">
      <motion.div 
        className={`inline-flex items-center gap-2 bg-gradient-to-r from-accent to-orange-400 text-white font-bold rounded-full shadow-lg ${sizes[size].container}`}
        whileHover={{ scale: 1.05 }}
      >
        <ApperIcon name="Coins" size={sizes[size].icon} className="sparkle-animation" />
        <span className={sizes[size].text}>{coins.toLocaleString()}</span>
      </motion.div>
      
      <AnimatePresence>
        {showGain && gain > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.8 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-success text-white px-2 py-1 rounded-full text-sm font-bold shadow-lg"
          >
            +{gain}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CoinDisplay