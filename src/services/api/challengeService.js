import { dailyChallengesData } from '@/services/mockData/dailyChallenges'
import { mathActivitiesData, readingActivitiesData } from '@/services/mockData/activities'
import { v4 as uuidv4 } from 'uuid'

// Mock delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let lastChallengeId = Math.max(...dailyChallengesData.map(c => c.Id), 0)

const generateNextId = () => {
  lastChallengeId += 1
  return lastChallengeId
}

export const getDailyChallenge = async (world, userProgress) => {
  await delay(300)
  
  const today = new Date().toDateString()
  const savedChallenges = JSON.parse(localStorage.getItem('questAcademyDailyChallenges') || '{}')
  
  // Check if user already has a challenge for today
  const existingChallenge = savedChallenges[`${world}-${today}`]
  if (existingChallenge) {
    return { ...existingChallenge }
  }
  
  // Generate new challenge
  const activities = world === 'math' ? mathActivitiesData : readingActivitiesData
  const completedIds = userProgress.completedActivities.map(a => a.id)
  const availableActivities = activities.filter(a => completedIds.includes(a.id))
  
  if (availableActivities.length === 0) {
    // If no completed activities, use first activity
    const firstActivity = activities[0]
    if (!firstActivity) return null
    
    const challenge = {
      Id: generateNextId(),
      world,
      date: today,
      activity: { ...firstActivity },
      bonusMultiplier: 2,
      specialReward: world === 'math' ? 'golden-calculator' : 'rainbow-bookmark',
      completed: false,
      createdAt: new Date().toISOString()
    }
    
    savedChallenges[`${world}-${today}`] = challenge
    localStorage.setItem('questAcademyDailyChallenges', JSON.stringify(savedChallenges))
    return { ...challenge }
  }
  
  // Select random completed activity
  const randomActivity = availableActivities[Math.floor(Math.random() * availableActivities.length)]
  
  const challenge = {
    Id: generateNextId(),
    world,
    date: today,
    activity: { ...randomActivity },
    bonusMultiplier: 2,
    specialReward: world === 'math' ? 'golden-calculator' : 'rainbow-bookmark',
    completed: false,
    createdAt: new Date().toISOString()
  }
  
  savedChallenges[`${world}-${today}`] = challenge
  localStorage.setItem('questAcademyDailyChallenges', JSON.stringify(savedChallenges))
  return { ...challenge }
}

export const completeChallenge = async (challengeId, results) => {
  await delay(200)
  
  const savedChallenges = JSON.parse(localStorage.getItem('questAcademyDailyChallenges') || '{}')
  
  // Find and update challenge
  for (const key in savedChallenges) {
    if (savedChallenges[key].Id === challengeId) {
      savedChallenges[key].completed = true
      savedChallenges[key].results = results
      savedChallenges[key].completedAt = new Date().toISOString()
      
      localStorage.setItem('questAcademyDailyChallenges', JSON.stringify(savedChallenges))
      return { ...savedChallenges[key] }
    }
  }
  
  throw new Error('Challenge not found')
}

export const getAllChallenges = async () => {
  await delay(200)
  const savedChallenges = JSON.parse(localStorage.getItem('questAcademyDailyChallenges') || '{}')
  return Object.values(savedChallenges)
}