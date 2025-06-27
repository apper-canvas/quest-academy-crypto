import { mathActivitiesData, readingActivitiesData } from '@/services/mockData/activities'

// Mock delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getMathActivities = async () => {
  await delay(400)
  return mathActivitiesData.map(activity => ({ ...activity }))
}

export const getReadingActivities = async () => {
  await delay(400)
  return readingActivitiesData.map(activity => ({ ...activity }))
}

export const getActivityById = async (id) => {
  await delay(200)
  const allActivities = [...mathActivitiesData, ...readingActivitiesData]
  const activity = allActivities.find(a => a.id === id)
  if (!activity) {
    throw new Error('Activity not found')
  }
  return { ...activity }
}