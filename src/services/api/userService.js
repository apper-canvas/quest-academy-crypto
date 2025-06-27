import { userProgressData } from '@/services/mockData/userProgress'

// Mock delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getUserProgress = async () => {
  await delay(300)
  
  // Get from localStorage or use default
  const saved = localStorage.getItem('questAcademyUserProgress')
  if (saved) {
    return JSON.parse(saved)
  }
  
  // Save default to localStorage
  localStorage.setItem('questAcademyUserProgress', JSON.stringify(userProgressData))
  return { ...userProgressData }
}

export const updateUserProgress = async (userId, updates) => {
  await delay(200)
  
  const current = await getUserProgress()
  
  // Apply updates
  const updated = { ...current }
  
  if (updates.xp) {
    updated.totalXP += updates.xp
    // Level up logic: every 1000 XP = new level
    updated.level = Math.floor(updated.totalXP / 1000) + 1
  }
  
  if (updates.coins !== undefined) {
    updated.coins = Math.max(0, updated.coins + updates.coins)
  }
  
  if (updates.completedActivity) {
    const activityExists = updated.completedActivities.some(a => a.id === updates.completedActivity)
    if (!activityExists) {
      // This would normally come from the activity service
      const activityInfo = {
        id: updates.completedActivity,
        type: updates.completedActivity.includes('math') ? 'math' : 'reading',
        title: `Level ${updates.completedActivity.split('-')[1]}`,
        completedAt: new Date().toISOString()
      }
      updated.completedActivities.push(activityInfo)
    }
  }
  
  if (updates.achievement) {
    if (!updated.achievements.includes(updates.achievement)) {
      updated.achievements.push(updates.achievement)
    }
  }
if (updates.unlockedItem) {
    if (!updated.unlockedItems) updated.unlockedItems = []
    if (!updated.unlockedItems.includes(updates.unlockedItem)) {
      updated.unlockedItems.push(updates.unlockedItem)
    }
  }
  
  if (updates.specialItem) {
    if (!updated.unlockedItems) updated.unlockedItems = []
    if (!updated.unlockedItems.includes(updates.specialItem)) {
      updated.unlockedItems.push(updates.specialItem)
    }
  }
  
  if (updates.challengeCompleted) {
    if (!updated.completedChallenges) updated.completedChallenges = []
    if (!updated.completedChallenges.includes(updates.challengeCompleted)) {
      updated.completedChallenges.push(updates.challengeCompleted)
    }
  }
  
  // Save to localStorage
  localStorage.setItem('questAcademyUserProgress', JSON.stringify(updated))
  
  return updated
}