export const userProgressData = {
  userId: 'user-1',
  username: 'Quest Hero',
  avatar: { 
    face: '😊',
    accessory: null,
    background: 'default'
  },
  totalXP: 1450,
  level: 3,
  coins: 850,
  achievements: ['first-game', 'math-master', 'reading-champion'],
  completedActivities: [
    {
      Id: 1,
      id: 'math-1',
      type: 'math',
      skill: 'addition',
      title: 'Basic Addition',
      score: 85,
      timeSpent: 120,
      completedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
      xpEarned: 50,
      coinsEarned: 25
    },
    {
      Id: 2,
      id: 'math-2',
      type: 'math',
      skill: 'subtraction',
      title: 'Simple Subtraction',
      score: 92,
      timeSpent: 95,
      completedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
      xpEarned: 60,
      coinsEarned: 30
    },
    {
      Id: 3,
      id: 'math-3',
      type: 'math',
      skill: 'mixed',
      title: 'Mixed Operations',
      score: 78,
      timeSpent: 150,
      completedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      xpEarned: 75,
      coinsEarned: 40
    },
    {
      Id: 4,
      id: 'math-4',
      type: 'math',
      skill: 'multiplication',
      title: 'Times Tables',
      score: 88,
      timeSpent: 110,
      completedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      xpEarned: 90,
      coinsEarned: 50
    },
    {
      Id: 5,
      id: 'reading-1',
      type: 'reading',
      skill: 'comprehension',
      title: 'The Little Cat',
      score: 95,
      timeSpent: 180,
      completedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      xpEarned: 50,
      coinsEarned: 25
    },
    {
      Id: 6,
      id: 'reading-2',
      type: 'reading',
      skill: 'comprehension',
      title: 'The Magic Garden',
      score: 90,
      timeSpent: 165,
      completedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      xpEarned: 60,
      coinsEarned: 30
    },
    {
      Id: 7,
      id: 'math-5',
      type: 'math',
      skill: 'division',
      title: 'Division Fun',
      score: 82,
      timeSpent: 140,
      completedAt: new Date(Date.now() - 86400000).toISOString(),
      xpEarned: 100,
      coinsEarned: 60
    }
  ],
  skillProgress: {
    addition: { mastery: 85, sessionsCompleted: 8, averageScore: 87, totalTimeSpent: 960 },
    subtraction: { mastery: 92, sessionsCompleted: 6, averageScore: 90, totalTimeSpent: 570 },
    multiplication: { mastery: 75, sessionsCompleted: 4, averageScore: 82, totalTimeSpent: 440 },
    division: { mastery: 68, sessionsCompleted: 3, averageScore: 79, totalTimeSpent: 420 },
    comprehension: { mastery: 88, sessionsCompleted: 12, averageScore: 91, totalTimeSpent: 2160 }
  },
  learningGoals: [
    {
      Id: 1,
      skill: 'multiplication',
      target: 90,
      current: 75,
      deadline: new Date(Date.now() + 86400000 * 14).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
    },
    {
      Id: 2,
      skill: 'division',
      target: 85,
      current: 68,
      deadline: new Date(Date.now() + 86400000 * 21).toISOString(),
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
    }
  ],
  weeklyProgress: [
    { date: new Date(Date.now() - 86400000 * 6).toISOString(), xp: 50, activities: 1 },
    { date: new Date(Date.now() - 86400000 * 5).toISOString(), xp: 60, activities: 1 },
    { date: new Date(Date.now() - 86400000 * 4).toISOString(), xp: 75, activities: 1 },
    { date: new Date(Date.now() - 86400000 * 3).toISOString(), xp: 90, activities: 1 },
    { date: new Date(Date.now() - 86400000 * 2).toISOString(), xp: 50, activities: 1 },
    { date: new Date(Date.now() - 86400000 * 1).toISOString(), xp: 60, activities: 1 },
    { date: new Date().toISOString(), xp: 100, activities: 1 }
  ],
  unlockedItems: [],
  streakDays: 7,
  lastPlayDate: new Date().toISOString()
}