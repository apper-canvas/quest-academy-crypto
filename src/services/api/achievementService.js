import { achievementsData } from '@/services/mockData/achievements'

// Mock delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getAchievements = async () => {
  await delay(300)
  return achievementsData.map(achievement => ({ ...achievement }))
}

export const getAchievementById = async (id) => {
  await delay(200)
  const achievement = achievementsData.find(a => a.id === id)
  if (!achievement) {
    throw new Error('Achievement not found')
  }
  return { ...achievement }
}