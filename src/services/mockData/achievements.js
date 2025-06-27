export const achievementsData = [
  {
    id: 'first-game',
    name: 'Getting Started',
    description: 'Complete your first learning activity',
    icon: 'Play',
    reward: 25,
    requirement: {
      type: 'complete_activities',
      count: 1
    }
  },
  {
    id: 'math-master',
    name: 'Math Master',
    description: 'Complete all Math Mountain levels',
    icon: 'Calculator',
    reward: 100,
    requirement: {
      type: 'complete_activities',
      count: 5,
      subject: 'math'
    }
  },
  {
    id: 'reading-hero',
    name: 'Reading Hero',
    description: 'Complete all Reading Rainbow stories',
    icon: 'BookOpen',
    reward: 100,
    requirement: {
      type: 'complete_activities',
      count: 5,
      subject: 'reading'
    }
  },
  {
    id: 'xp-collector',
    name: 'XP Collector',
    description: 'Earn 500 total XP points',
    icon: 'Zap',
    reward: 50,
    requirement: {
      type: 'earn_xp',
      amount: 500
    }
  },
  {
    id: 'coin-saver',
    name: 'Coin Saver',
    description: 'Collect 300 coins',
    icon: 'Coins',
    reward: 75,
    requirement: {
      type: 'collect_coins',
      amount: 300
    }
  },
  {
    id: 'speed-learner',
    name: 'Speed Learner',
    description: 'Complete 3 activities in one day',
    icon: 'Zap',
    reward: 60,
    requirement: {
      type: 'daily_activities',
      count: 3
    }
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get 100% on any activity',
    icon: 'Target',
    reward: 80,
    requirement: {
      type: 'perfect_score',
      count: 1
    }
  },
  {
    id: 'shopaholic',
    name: 'Shopaholic',
    description: 'Purchase 5 items from the Avatar Shop',
    icon: 'ShoppingBag',
    reward: 40,
    requirement: {
      type: 'purchase_items',
      count: 5
    }
  },
  {
    id: 'level-up',
    name: 'Level Up!',
    description: 'Reach Level 3',
    icon: 'TrendingUp',
    reward: 90,
    requirement: {
      type: 'reach_level',
      level: 3
    }
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Complete all available activities',
    icon: 'Trophy',
    reward: 200,
    requirement: {
      type: 'complete_activities',
      count: 10
    }
  }
]