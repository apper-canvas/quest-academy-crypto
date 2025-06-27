import { useState, useEffect } from 'react'
import { getUserProgress, updateUserProgress } from '@/services/api/userService'

export const useUserProgress = () => {
  const [userProgress, setUserProgress] = useState({
    userId: 'user-1',
    username: 'Quest Hero',
    avatar: { face: '😊' },
    totalXP: 0,
    level: 1,
    coins: 100,
    achievements: [],
    completedActivities: [],
    unlockedItems: []
  })
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    loadUserProgress()
  }, [])
  
  const loadUserProgress = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getUserProgress()
      setUserProgress(data)
    } catch (err) {
      setError('Failed to load user progress')
    } finally {
      setLoading(false)
    }
  }
  
  const updateProgress = async (updates) => {
    try {
      const updatedProgress = await updateUserProgress(userProgress.userId, updates)
      setUserProgress(updatedProgress)
    } catch (err) {
      console.error('Failed to update progress:', err)
    }
  }
  
  return {
    userProgress,
    loading,
    error,
    updateProgress,
    refreshProgress: loadUserProgress
  }
}