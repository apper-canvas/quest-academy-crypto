import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import CoinDisplay from '@/components/molecules/CoinDisplay'
import Avatar from '@/components/atoms/Avatar'
import { useUserProgress } from '@/hooks/useUserProgress'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { userProgress } = useUserProgress()
  
  const navItems = [
    { path: '/', label: 'World Map', icon: 'Map' },
    { path: '/progress', label: 'My Progress', icon: 'TrendingUp' },
    { path: '/shop', label: 'Avatar Shop', icon: 'ShoppingBag' },
    { path: '/achievements', label: 'Achievements', icon: 'Trophy' }
  ]
  
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <ApperIcon name="BookOpen" size={24} className="text-white" />
            </div>
            <h1 className="font-display text-xl text-gray-800 hidden sm:block">
              Quest Academy
            </h1>
          </NavLink>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'text-gray-600 hover:text-primary hover:bg-primary/10'
                  }`
                }
              >
                <ApperIcon name={item.icon} size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          
          {/* User Info */}
          <div className="flex items-center gap-4">
            <CoinDisplay coins={userProgress.coins} />
            <Avatar avatar={userProgress.avatar} size="md" animated />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ApperIcon 
                name={isMenuOpen ? 'X' : 'Menu'} 
                size={20} 
                className="text-gray-600" 
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <ApperIcon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header