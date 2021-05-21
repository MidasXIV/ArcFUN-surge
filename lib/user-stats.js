/**
 * helper methods to parse User Stats
 */

export function isLevelCompleted(levelId, user) {
  if (!levelId || !user) {
    return false;
  }
  const { levelStats } = user;
  return levelStats[levelId]?.isLevelSolved ?? false;
}

export function isLevelUnlocked(levelId, user) {
  if (!levelId || !user) {
    return false;
  }
  const { levelStats } = user;
  return levelStats[levelId]?.isLevelUnlocked ?? false;
}
