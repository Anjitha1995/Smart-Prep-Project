import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BookOpen,
  Timer,
  TrendingUp,
  ClipboardList,
} from "lucide-react";
import StatsCard from "../components/dashboard/StatsCard";
import TasksPreview from "../components/dashboard/TaskPreview";
import FocusWidget from "../components/dashboard/FocusWidget";
import UpcomingExams from "../components/dashboard/UpcomingExams";
import { selectSubjects } from "../features/subjects/subjectSelectors";
import { selectStudyPlan } from "../features/studyPlan/studyPlanSelectors";
import { formatDateDDMMYY } from "../utils/dateUtils";

export default function DashboardPage() {
  const subjects = useSelector(selectSubjects);
  const plan = useSelector(selectStudyPlan);

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = useMemo(() => {
    const todayPlan = plan.find((day) => day.date === today);
    return todayPlan?.tasks || [];
  }, [plan, today]);

  const stats = useMemo(() => {
    const totalTasks = todayTasks.length;

    const completedTasks = todayTasks.filter((task) => {
      if (task.type === "Study") return task.completed;
      if (task.type === "Revision") return task.revisionCompleted;
      return false;
    }).length;

    const progress = totalTasks
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

    return {
      tasksToday: totalTasks,
      completedTasks,
      progress: `${progress}%`,
      subjects: subjects.length,
      focusTime: "0h 0m",
    };
  }, [todayTasks, subjects]);

  const exams = useMemo(() => {
    return subjects
      .filter((subject) => subject.examDate)
      .map((subject) => {
        const exam = new Date(subject.examDate);
        const current = new Date(today);

        exam.setHours(0, 0, 0, 0);
        current.setHours(0, 0, 0, 0);

        const daysLeft = Math.ceil(
          (exam - current) / (1000 * 60 * 60 * 24)
        );

        return {
          id: subject.id,
          subject: subject.name,
          date: formatDateDDMMYY(subject.examDate),
          daysLeft,
        };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 5);
  }, [subjects, today]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Track your study plan, tasks, and focus progress in one place.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Tasks Today"
          value={stats.tasksToday}
          subtitle="Pending and completed tasks"
          icon={<ClipboardList className="h-6 w-6" />}
          accent="blue"
        />

        <StatsCard
          title="Focus Time"
          value={stats.focusTime}
          subtitle="Today's total sessions"
          icon={<Timer className="h-6 w-6" />}
          accent="green"
        />

        <StatsCard
          title="Progress"
          value={stats.progress}
          subtitle={`${stats.completedTasks} completed today`}
          icon={<TrendingUp className="h-6 w-6" />}
          accent="purple"
        />

        <StatsCard
          title="Subjects"
          value={stats.subjects}
          subtitle="Currently active subjects"
          icon={<BookOpen className="h-6 w-6" />}
          accent="orange"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <TasksPreview tasks={todayTasks} />
        <FocusWidget time="25:00" sessions={0} totalMinutes={0} />
      </div>

      <div className="grid gap-6">
        <UpcomingExams exams={exams} />
      </div>
    </div>
  );
}