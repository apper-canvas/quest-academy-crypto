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

export const getCategorizedAchievements = async (category) => {
  await delay(200)
  
  const getAchievementCategory = (achievement) => {
    const { requirement } = achievement
    if (requirement.type === 'complete_activities' || requirement.type === 'daily_activities' || requirement.type === 'perfect_score') {
      return 'learning'
    }
    if (requirement.type === 'earn_xp' || requirement.type === 'collect_coins' || requirement.type === 'purchase_items') {
      return 'collection'
    }
    if (requirement.type === 'reach_level' || achievement.id === 'math-master' || achievement.id === 'reading-hero' || achievement.id === 'completionist') {
      return 'mastery'
    }
    return 'learning'
  }
  
  if (category === 'all') {
    return achievementsData.map(achievement => ({ ...achievement }))
  }
  
  return achievementsData
    .filter(achievement => getAchievementCategory(achievement) === category)
    .map(achievement => ({ ...achievement }))
}