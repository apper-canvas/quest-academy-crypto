export const userProgressData = {
  userId: 'user-1',
  username: 'Quest Hero',
  avatar: { 
    face: '😊',
    accessory: null,
    background: 'default'
  },
  totalXP: 250,
  level: 1,
  coins: 150,
  achievements: ['first-game'],
  completedActivities: [
    {
      id: 'math-1',
      type: 'math',
      title: 'Basic Addition',
      completedAt: new Date(Date.now() - 86400000).toISOString() // Yesterday
    }
  ],
  unlockedItems: [],
  streakDays: 1,
  lastPlayDate: new Date().toISOString()
}