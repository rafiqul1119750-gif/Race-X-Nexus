export const DAILY_TASKS = [
  { id: 't1', label: 'Watch 5 AI Reels', reward: 50, type: 'GEMS' },
  { id: 't2', label: 'Create 1 Studio Post', reward: 2, type: 'DIAMONDS' },
  { id: 't3', label: 'Gift a Diamond to a Creator', reward: 100, type: 'GEMS' },
  { id: 't4', label: 'Explore 10 AI Models', reward: 1, type: 'DIAMONDS' },
  { id: 't5', label: 'Complete Weekly Challenge', reward: 10, type: 'DIAMONDS' }
];

// Logic to pick 3 random tasks for the day
export const getDailyProtocol = () => {
  return DAILY_TASKS.sort(() => 0.5 - Math.random()).slice(0, 3);
};
