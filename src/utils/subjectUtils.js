export function deriveSubjectDifficulty(topics = []) {
  if (!topics.length) return "";

  const difficultyScore = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
  };

  const total = topics.reduce(
    (sum, topic) => sum + (difficultyScore[topic.difficulty] || 0),
    0
  );

  const average = total / topics.length;

  if (average <= 1.5) return "Easy";
  if (average <= 2.3) return "Medium";
  return "Hard";
}