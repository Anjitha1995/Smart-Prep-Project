const TOPIC_HOURS = {
  Easy: 1,
  Medium: 1.5,
  Hard: 2,
};

const PRIORITY_SCORE = {
  High: 3,
  Medium: 2,
  Low: 1,
};

function getTodayDateString() {
  return new Date().toISOString().split("T")[0];
}

function diffInDays(fromDate, toDate) {
  const from = new Date(fromDate);
  const to = new Date(toDate);

  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);

  const diff = to - from;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function getRevisionInterval(revisionFrequency) {
  switch (revisionFrequency) {
    case "Daily":
      return 1;
    case "Every 2 days":
      return 2;
    case "Twice a week":
      return 3;
    case "Weekly":
      return 7;
    default:
      return null;
  }
}

function sortSubjects(subjects) {
  const today = getTodayDateString();

  return [...subjects].sort((a, b) => {
    const daysA = diffInDays(today, a.examDate);
    const daysB = diffInDays(today, b.examDate);

    const priorityA = PRIORITY_SCORE[a.priority] || 0;
    const priorityB = PRIORITY_SCORE[b.priority] || 0;

    if (daysA !== daysB) return daysA - daysB;
    return priorityB - priorityA;
  });
}

function sortTopics(topics) {
  return [...topics].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    const difficultyScore = { Hard: 3, Medium: 2, Easy: 1 };
    return (
      (difficultyScore[b.difficulty] || 0) -
      (difficultyScore[a.difficulty] || 0)
    );
  });
}

function createEmptyDayMap(subjects) {
  const today = getTodayDateString();
  const planMap = {};

  subjects.forEach((subject) => {
    const daysLeft = diffInDays(today, subject.examDate);

    for (let i = 0; i <= daysLeft; i++) {
      const date = addDays(today, i);
      if (!planMap[date]) {
        planMap[date] = {
          date,
          usedHours: 0,
          tasks: [],
        };
      }
    }
  });

  return planMap;
}

function addTaskToPlan(planMap, date, task, userDailyLimit) {
  if (!planMap[date]) {
    planMap[date] = {
      date,
      usedHours: 0,
      tasks: [],
    };
  }

  if (planMap[date].usedHours + task.estimatedHours > userDailyLimit) {
    return false;
  }

  planMap[date].tasks.push(task);
  planMap[date].usedHours += task.estimatedHours;
  return true;
}

function scheduleTopic(planMap, subject, topic, userDailyLimit) {
  const today = getTodayDateString();
  const daysLeft = diffInDays(today, subject.examDate);
  const estimatedHours = TOPIC_HOURS[topic.difficulty] || 1;

  for (let i = 0; i <= daysLeft; i++) {
    const date = addDays(today, i);

    const scheduled = addTaskToPlan(
      planMap,
      date,
      {
        id: `${subject.id}-${topic.id}-${date}`,
        type: "Study",
        subjectId: subject.id,
        subject: subject.name,
        topicId: topic.id,
        topic: topic.name,
        difficulty: topic.difficulty,
        estimatedHours,
        completed: topic.completed || false,
        revisionCompleted: topic.revisionCompleted || false,
      },
      userDailyLimit
    );

    if (scheduled) return date;
  }

  return null;
}

function scheduleRevision(planMap, subject, topic, studyDate, userDailyLimit) {
  if (!subject.includeRevision) return;

  const interval = getRevisionInterval(subject.revisionFrequency);
  if (!interval) return;

  const revisionDate = addDays(studyDate, interval);

  if (revisionDate > subject.examDate) return;

  addTaskToPlan(
    planMap,
    revisionDate,
    {
      id: `rev-${subject.id}-${topic.id}-${revisionDate}`,
      type: "Revision",
      subjectId: subject.id,
      subject: subject.name,
      topicId: topic.id,
      topic: topic.name,
      difficulty: topic.difficulty,
      estimatedHours: 0.5,
      completed: false,
      revisionCompleted: topic.revisionCompleted || false,
    },
    userDailyLimit
  );
}

export function generateRuleBasedStudyPlan(subjects = [], userDailyHours = 3) {
  if (!subjects.length) return [];

  const validSubjects = subjects.filter(
    (subject) =>
      subject.examDate &&
      Array.isArray(subject.topics) &&
      subject.topics.length > 0 &&
      Number(subject.dailyStudyHours) >= 0
  );

  const sortedSubjects = sortSubjects(validSubjects);
  const planMap = createEmptyDayMap(sortedSubjects);

  sortedSubjects.forEach((subject) => {
    const sortedTopics = sortTopics(subject.topics);

    sortedTopics.forEach((topic) => {
      const studyDate = scheduleTopic(planMap, subject, topic, userDailyHours);

      if (studyDate) {
        scheduleRevision(planMap, subject, topic, studyDate, userDailyHours);
      }
    });
  });

  return Object.values(planMap)
    .filter((day) => day.tasks.length > 0)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function groupStudyPlan(plan = []) {
  const today = new Date().toISOString().split("T")[0];

  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().split("T")[0];

  const grouped = {
    today: [],
    tomorrow: [],
    upcoming: [],
  };

  plan.forEach((day) => {
    if (day.date === today) {
      grouped.today.push(day);
    } else if (day.date === tomorrow) {
      grouped.tomorrow.push(day);
    } else if (day.date > tomorrow) {
      grouped.upcoming.push(day);
    }
  });

  return grouped;
}