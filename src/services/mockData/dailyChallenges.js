const dailyChallengesData = [
  {
    Id: 1,
    world: 'math',
    date: new Date(Date.now() - 86400000).toDateString(),
    activity: {
      id: 'math-1',
      title: 'Basic Addition',
      description: 'Learn to add numbers up to 10',
      type: 'math',
      difficulty: 1,
      timeLimit: 60,
      rewards: { xp: 50, coins: 25 }
    },
    bonusMultiplier: 2,
    specialReward: 'golden-calculator',
    completed: true,
    results: { score: 4, total: 5, percentage: 80, passed: true },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    completedAt: new Date(Date.now() - 86400000 + 3600000).toISOString()
  },
  {
    Id: 2,
    world: 'reading',
    date: new Date(Date.now() - 86400000 * 2).toDateString(),
    activity: {
      id: 'reading-1',
      title: 'The Little Cat',
      description: 'A simple story about a playful cat',
      type: 'reading',
      difficulty: 1,
      timeLimit: 120,
      rewards: { xp: 50, coins: 25 }
    },
    bonusMultiplier: 2,
    specialReward: 'rainbow-bookmark',
    completed: true,
    results: { score: 3, total: 3, percentage: 100, passed: true },
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 2 + 7200000).toISOString()
  },
  {
    Id: 3,
    world: 'math',
    date: new Date().toDateString(),
    activity: {
      id: 'math-2',
      title: 'Simple Subtraction',
      description: 'Practice taking away numbers',
      type: 'math',
      difficulty: 1,
      timeLimit: 60,
      rewards: { xp: 60, coins: 30 }
    },
    bonusMultiplier: 2,
    specialReward: 'golden-calculator',
    completed: false,
    createdAt: new Date().toISOString()
  }
]
export { dailyChallengesData }