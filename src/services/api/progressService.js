import { userProgressData } from '@/services/mockData/userProgress'

// Get comprehensive progress analytics
export const getProgressAnalytics = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const { completedActivities, skillProgress, weeklyProgress } = userProgressData
  
  return {
    skillProgress: { ...skillProgress },
    weeklyProgress: [...weeklyProgress],
    recentActivities: completedActivities.slice(-10).reverse(),
    totalActivities: completedActivities.length,
    averageScore: Math.round(
      completedActivities.reduce((acc, activity) => acc + activity.score, 0) / completedActivities.length
    ),
    totalTimeSpent: completedActivities.reduce((acc, activity) => acc + activity.timeSpent, 0)
  }
}

// Get skill-specific progress charts data
export const getSkillChartsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const { completedActivities, skillProgress } = userProgressData
  
  // Group activities by skill for trend analysis
  const skillTrends = {}
  completedActivities.forEach(activity => {
    if (!skillTrends[activity.skill]) {
      skillTrends[activity.skill] = []
    }
    skillTrends[activity.skill].push({
      date: activity.completedAt,
      score: activity.score,
      timeSpent: activity.timeSpent
    })
  })
  
  // Sort by date for each skill
  Object.keys(skillTrends).forEach(skill => {
    skillTrends[skill].sort((a, b) => new Date(a.date) - new Date(b.date))
  })
  
  return {
    masteryLevels: Object.entries(skillProgress).map(([skill, data]) => ({
      skill: skill.charAt(0).toUpperCase() + skill.slice(1),
      mastery: data.mastery,
      sessions: data.sessionsCompleted
    })),
    skillTrends,
    weeklyXP: userProgressData.weeklyProgress.map(day => ({
      date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
      xp: day.xp,
      activities: day.activities
    }))
  }
}

// Get learning goals with progress
export const getLearningGoals = async () => {
  await new Promise(resolve => setTimeout(resolve, 150))
  return [...userProgressData.learningGoals]
}

// Create new learning goal
export const createLearningGoal = async (goalData) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const newGoal = {
    Id: userProgressData.learningGoals.length + 1,
    skill: goalData.skill,
    target: goalData.target,
    current: userProgressData.skillProgress[goalData.skill]?.mastery || 0,
    deadline: goalData.deadline,
    createdAt: new Date().toISOString()
  }
  
  userProgressData.learningGoals.push(newGoal)
  return { ...newGoal }
}

// Update learning goal
export const updateLearningGoal = async (goalId, updates) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const goalIndex = userProgressData.learningGoals.findIndex(goal => goal.Id === goalId)
  if (goalIndex === -1) throw new Error('Goal not found')
  
  userProgressData.learningGoals[goalIndex] = {
    ...userProgressData.learningGoals[goalIndex],
    ...updates
  }
  
  return { ...userProgressData.learningGoals[goalIndex] }
}

// Delete learning goal
export const deleteLearningGoal = async (goalId) => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const goalIndex = userProgressData.learningGoals.findIndex(goal => goal.Id === goalId)
  if (goalIndex === -1) throw new Error('Goal not found')
  
  userProgressData.learningGoals.splice(goalIndex, 1)
  return true
}

// Get detailed activity history with filters
export const getActivityHistory = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 250))
  
  let activities = [...userProgressData.completedActivities]
  
  // Apply filters
  if (filters.skill) {
    activities = activities.filter(activity => activity.skill === filters.skill)
  }
  
  if (filters.type) {
    activities = activities.filter(activity => activity.type === filters.type)
  }
  
  if (filters.dateRange) {
    const { start, end } = filters.dateRange
    activities = activities.filter(activity => {
      const activityDate = new Date(activity.completedAt)
      return activityDate >= new Date(start) && activityDate <= new Date(end)
    })
  }
  
  // Sort by most recent first
  activities.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
  
  return activities
}