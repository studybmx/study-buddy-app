export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const BADGES: Badge[] = [
  {
    id: "day1_completed",
    name: "Day 1: Survived! 🦖",
    description: "You completed your very first day without running away.",
    icon: "🎉"
  },
  {
    id: "first_audio",
    name: "Mic Drop 🎤",
    description: "You sent your first voice note. The world is listening.",
    icon: "🎙️"
  },
  {
    id: "day3_streak",
    name: "Three-peat! 🔥",
    description: "3 days in! You're literally unstoppable right now.",
    icon: "🔥"
  },
  {
    id: "day10_halfway",
    name: "Halfway Hero 🦸",
    description: "Day 10 reached. You've officially defeated procrastination.",
    icon: "🚀"
  }
];

export function evaluateBadges(
  completedDays: number[], 
  audioCount: number, 
  currentBadges: string[]
): string[] {
  const newBadges: string[] = [];

  if (completedDays.includes(1) && !currentBadges.includes("day1_completed")) {
    newBadges.push("day1_completed");
  }
  
  if (audioCount >= 1 && !currentBadges.includes("first_audio")) {
    newBadges.push("first_audio");
  }

  if (completedDays.length >= 3 && !currentBadges.includes("day3_streak")) {
    newBadges.push("day3_streak");
  }

  if (completedDays.length >= 10 && !currentBadges.includes("day10_halfway")) {
    newBadges.push("day10_halfway");
  }

  return newBadges;
}
