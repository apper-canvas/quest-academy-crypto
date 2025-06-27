export const mathActivitiesData = [
  {
    id: 'math-1',
    title: 'Basic Addition',
    description: 'Learn to add numbers up to 10',
    type: 'math',
    difficulty: 1,
    timeLimit: 60,
    rewards: { xp: 50, coins: 25 },
    questions: [
      {
        question: '2 + 3 = ?',
        answer: 5,
        visual: 5
      },
      {
        question: '4 + 1 = ?',
        answer: 5,
        visual: 5
      },
      {
        question: '3 + 4 = ?',
        answer: 7,
        visual: 7
      },
      {
        question: '5 + 2 = ?',
        answer: 7,
        visual: 7
      },
      {
        question: '1 + 6 = ?',
        answer: 7,
        visual: 7
      }
    ]
  },
  {
    id: 'math-2',
    title: 'Simple Subtraction',
    description: 'Practice taking away numbers',
    type: 'math',
    difficulty: 1,
    timeLimit: 60,
    rewards: { xp: 60, coins: 30 },
    questions: [
      {
        question: '5 - 2 = ?',
        answer: 3,
        visual: 3
      },
      {
        question: '8 - 3 = ?',
        answer: 5,
        visual: 5
      },
      {
        question: '7 - 4 = ?',
        answer: 3,
        visual: 3
      },
      {
        question: '9 - 1 = ?',
        answer: 8,
        visual: 8
      },
      {
        question: '6 - 6 = ?',
        answer: 0,
        visual: 0
      }
    ]
  },
  {
    id: 'math-3',
    title: 'Mixed Operations',
    description: 'Addition and subtraction together',
    type: 'math',
    difficulty: 2,
    timeLimit: 90,
    rewards: { xp: 75, coins: 40 },
    questions: [
      {
        question: '3 + 4 - 2 = ?',
        answer: 5
      },
      {
        question: '8 - 3 + 1 = ?',
        answer: 6
      },
      {
        question: '5 + 5 - 4 = ?',
        answer: 6
      },
      {
        question: '9 - 2 + 3 = ?',
        answer: 10
      },
      {
        question: '7 + 1 - 5 = ?',
        answer: 3
      }
    ]
  },
  {
    id: 'math-4',
    title: 'Times Tables',
    description: 'Learn multiplication basics',
    type: 'math',
    difficulty: 2,
    timeLimit: 90,
    rewards: { xp: 90, coins: 50 },
    questions: [
      {
        question: '2 × 3 = ?',
        answer: 6
      },
      {
        question: '4 × 2 = ?',
        answer: 8
      },
      {
        question: '3 × 3 = ?',
        answer: 9
      },
      {
        question: '5 × 2 = ?',
        answer: 10
      },
      {
        question: '2 × 6 = ?',
        answer: 12
      }
    ]
  },
  {
    id: 'math-5',
    title: 'Division Fun',
    description: 'Divide numbers evenly',
    type: 'math',
    difficulty: 3,
    timeLimit: 120,
    rewards: { xp: 100, coins: 60 },
    questions: [
      {
        question: '8 ÷ 2 = ?',
        answer: 4
      },
      {
        question: '12 ÷ 3 = ?',
        answer: 4
      },
      {
        question: '15 ÷ 5 = ?',
        answer: 3
      },
      {
        question: '18 ÷ 6 = ?',
        answer: 3
      },
      {
        question: '20 ÷ 4 = ?',
        answer: 5
      }
    ]
  }
]

export const readingActivitiesData = [
  {
    id: 'reading-1',
    title: 'The Little Cat',
    description: 'A simple story about a playful cat',
    type: 'reading',
    difficulty: 1,
    timeLimit: 120,
    rewards: { xp: 50, coins: 25 },
    questions: [
      {
        passage: 'Mimi is a little cat. She has soft, orange fur and bright green eyes. Mimi loves to play with her red ball. Every morning, she runs around the garden and chases butterflies. When she gets tired, she takes a nap in the sunny spot by the window.',
        question: 'What color is Mimi\'s fur?',
        options: ['Orange', 'Black', 'White', 'Gray'],
        correctAnswer: 'Orange'
      },
      {
        passage: 'Mimi is a little cat. She has soft, orange fur and bright green eyes. Mimi loves to play with her red ball. Every morning, she runs around the garden and chases butterflies. When she gets tired, she takes a nap in the sunny spot by the window.',
        question: 'What does Mimi like to play with?',
        options: ['A mouse', 'A red ball', 'A toy car', 'A stick'],
        correctAnswer: 'A red ball'
      },
      {
        passage: 'Mimi is a little cat. She has soft, orange fur and bright green eyes. Mimi loves to play with her red ball. Every morning, she runs around the garden and chases butterflies. When she gets tired, she takes a nap in the sunny spot by the window.',
        question: 'Where does Mimi nap?',
        options: ['On the bed', 'Under the table', 'By the window', 'In the garden'],
        correctAnswer: 'By the window'
      }
    ]
  },
  {
    id: 'reading-2',
    title: 'The Magic Garden',
    description: 'Discover a special place where flowers grow',
    type: 'reading',
    difficulty: 1,
    timeLimit: 120,
    rewards: { xp: 60, coins: 30 },
    questions: [
      {
        passage: 'Lucy found a secret garden behind her grandmother\'s house. In this garden, the flowers were bigger and more colorful than anywhere else. There were giant sunflowers as tall as trees, roses that sparkled like diamonds, and daisies that glowed in the dark. Lucy learned that her grandmother had been taking care of this magical place for many years.',
        question: 'Where did Lucy find the secret garden?',
        options: ['At school', 'Behind her grandmother\'s house', 'In the park', 'At her friend\'s house'],
        correctAnswer: 'Behind her grandmother\'s house'
      },
      {
        passage: 'Lucy found a secret garden behind her grandmother\'s house. In this garden, the flowers were bigger and more colorful than anywhere else. There were giant sunflowers as tall as trees, roses that sparkled like diamonds, and daisies that glowed in the dark. Lucy learned that her grandmother had been taking care of this magical place for many years.',
        question: 'What made the roses special?',
        options: ['They were very small', 'They sparkled like diamonds', 'They were purple', 'They had no smell'],
        correctAnswer: 'They sparkled like diamonds'
      },
      {
        passage: 'Lucy found a secret garden behind her grandmother\'s house. In this garden, the flowers were bigger and more colorful than anywhere else. There were giant sunflowers as tall as trees, roses that sparkled like diamonds, and daisies that glowed in the dark. Lucy learned that her grandmother had been taking care of this magical place for many years.',
        question: 'Who had been caring for the garden?',
        options: ['Lucy', 'Her grandmother', 'Her mother', 'A gardener'],
        correctAnswer: 'Her grandmother'
      }
    ]
  },
  {
    id: 'reading-3',
    title: 'The Brave Little Mouse',
    description: 'A tiny hero saves the day',
    type: 'reading',
    difficulty: 2,
    timeLimit: 150,
    rewards: { xp: 75, coins: 40 },
    questions: [
      {
        passage: 'Max was the smallest mouse in the barn, but he had the biggest heart. One stormy night, when all the farm animals were scared and hiding, Max heard a tiny cry for help. A baby bird had fallen from its nest in the rain. While the other animals were too frightened to go outside, brave little Max ran through the storm. He found the baby bird, cold and wet, and carefully carried it back to safety. The next morning, all the animals cheered for Max, the tiniest but bravest hero on the farm.',
        question: 'What kind of night was it when the story happened?',
        options: ['Sunny', 'Snowy', 'Stormy', 'Quiet'],
        correctAnswer: 'Stormy'
      },
      {
        passage: 'Max was the smallest mouse in the barn, but he had the biggest heart. One stormy night, when all the farm animals were scared and hiding, Max heard a tiny cry for help. A baby bird had fallen from its nest in the rain. While the other animals were too frightened to go outside, brave little Max ran through the storm. He found the baby bird, cold and wet, and carefully carried it back to safety. The next morning, all the animals cheered for Max, the tiniest but bravest hero on the farm.',
        question: 'Who needed help?',
        options: ['A baby bird', 'Another mouse', 'A cat', 'A farmer'],
        correctAnswer: 'A baby bird'
      },
      {
        passage: 'Max was the smallest mouse in the barn, but he had the biggest heart. One stormy night, when all the farm animals were scared and hiding, Max heard a tiny cry for help. A baby bird had fallen from its nest in the rain. While the other animals were too frightened to go outside, brave little Max ran through the storm. He found the baby bird, cold and wet, and carefully carried it back to safety. The next morning, all the animals cheered for Max, the tiniest but bravest hero on the farm.',
        question: 'How did the other animals react to Max the next morning?',
        options: ['They ignored him', 'They were angry', 'They cheered for him', 'They laughed at him'],
        correctAnswer: 'They cheered for him'
      }
    ]
  },
  {
    id: 'reading-4',
    title: 'The Friendly Dragon',
    description: 'Not all dragons are scary!',
    type: 'reading',
    difficulty: 2,
    timeLimit: 150,
    rewards: { xp: 90, coins: 50 },
    questions: [
      {
        passage: 'Everyone in the village was afraid of the dragon who lived on the mountain. They had never seen him, but they heard his loud roars echoing through the valley. One day, a curious girl named Emma decided to climb the mountain to meet the dragon. When she reached the top, she found a lonely dragon sitting by himself. "Why do you roar so loudly?" Emma asked. The dragon looked sad and replied, "I\'m not trying to scare anyone. I roar because I\'m lonely and want friends, but everyone runs away." Emma smiled and said, "I\'ll be your friend!" From that day on, the dragon\'s roars became happy songs that made the whole village smile.',
        question: 'Why was the dragon roaring?',
        options: ['He was angry', 'He was lonely and wanted friends', 'He was trying to scare people', 'He was practicing'],
        correctAnswer: 'He was lonely and wanted friends'
      },
      {
        passage: 'Everyone in the village was afraid of the dragon who lived on the mountain. They had never seen him, but they heard his loud roars echoing through the valley. One day, a curious girl named Emma decided to climb the mountain to meet the dragon. When she reached the top, she found a lonely dragon sitting by himself. "Why do you roar so loudly?" Emma asked. The dragon looked sad and replied, "I\'m not trying to scare anyone. I roar because I\'m lonely and want friends, but everyone runs away." Emma smiled and said, "I\'ll be your friend!" From that day on, the dragon\'s roars became happy songs that made the whole village smile.',
        question: 'What did Emma do when she met the dragon?',
        options: ['She ran away', 'She offered to be his friend', 'She was scared', 'She called for help'],
        correctAnswer: 'She offered to be his friend'
      },
      {
        passage: 'Everyone in the village was afraid of the dragon who lived on the mountain. They had never seen him, but they heard his loud roars echoing through the valley. One day, a curious girl named Emma decided to climb the mountain to meet the dragon. When she reached the top, she found a lonely dragon sitting by himself. "Why do you roar so loudly?" Emma asked. The dragon looked sad and replied, "I\'m not trying to scare anyone. I roar because I\'m lonely and want friends, but everyone runs away." Emma smiled and said, "I\'ll be your friend!" From that day on, the dragon\'s roars became happy songs that made the whole village smile.',
        question: 'What happened to the dragon\'s roars after he met Emma?',
        options: ['They got louder', 'They stopped completely', 'They became happy songs', 'They became scarier'],
        correctAnswer: 'They became happy songs'
      }
    ]
  },
  {
    id: 'reading-5',
    title: 'The Time-Traveling Backpack',
    description: 'Adventure through different time periods',
    type: 'reading',
    difficulty: 3,
    timeLimit: 180,
    rewards: { xp: 100, coins: 60 },
    questions: [
      {
        passage: 'Jake discovered an old backpack in his attic that had the most amazing power - it could transport him to different times in history! On his first adventure, Jake found himself in ancient Egypt, watching workers build the great pyramids. The backpack had special instructions: he could observe and learn, but he must never change anything in the past. During his second trip, Jake visited medieval times and saw knights training for battle. His third journey took him to the Wild West, where he watched cowboys herding cattle across vast plains. Each adventure taught Jake something new about how people lived in different times, and he always returned home with exciting stories to tell.',
        question: 'What special power did the backpack have?',
        options: ['It could fly', 'It could transport him through time', 'It could make him invisible', 'It could talk'],
        correctAnswer: 'It could transport him through time'
      },
      {
        passage: 'Jake discovered an old backpack in his attic that had the most amazing power - it could transport him to different times in history! On his first adventure, Jake found himself in ancient Egypt, watching workers build the great pyramids. The backpack had special instructions: he could observe and learn, but he must never change anything in the past. During his second trip, Jake visited medieval times and saw knights training for battle. His third journey took him to the Wild West, where he watched cowboys herding cattle across vast plains. Each adventure taught Jake something new about how people lived in different times, and he always returned home with exciting stories to tell.',
        question: 'What was the important rule about using the backpack?',
        options: ['Use it only once', 'Never tell anyone', 'Never change anything in the past', 'Only visit the future'],
        correctAnswer: 'Never change anything in the past'
      },
      {
        passage: 'Jake discovered an old backpack in his attic that had the most amazing power - it could transport him to different times in history! On his first adventure, Jake found himself in ancient Egypt, watching workers build the great pyramids. The backpack had special instructions: he could observe and learn, but he must never change anything in the past. During his second trip, Jake visited medieval times and saw knights training for battle. His third journey took him to the Wild West, where he watched cowboys herding cattle across vast plains. Each adventure taught Jake something new about how people lived in different times, and he always returned home with exciting stories to tell.',
        question: 'What did Jake see during his visit to medieval times?',
        options: ['Pyramids being built', 'Knights training for battle', 'Cowboys herding cattle', 'Modern buildings'],
        correctAnswer: 'Knights training for battle'
      }
    ]
  }
]