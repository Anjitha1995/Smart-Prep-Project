import {
  Clock,
  CheckCircle,
  TrendingUp,
  Flame,
} from "lucide-react";

import AnalyticsCard from "../components/analytics/AnalyticsCard";
import ProgressBar from "../components/analytics/ProgressBar";
import Card from "../components/common/Card";

export default function AnalyticsPage() {
  // Dummy data
  const stats = {
    totalStudyTime: "12h 30m",
    tasksCompleted: 18,
    productivity: "82%",
    streak: 5,
  };

  const subjectProgress = [
    { label: "Physics", value: 70 },
    { label: "Mathematics", value: 55 },
    { label: "Chemistry", value: 80 },
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Analytics
        </h1>
        <p className="mt-2 text-slate-600">
          Track your study performance and productivity.
        </p>
      </div>

      {/* Top stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Total Study Time"
          value={stats.totalStudyTime}
          subtitle="This week"
          icon={<Clock className="h-5 w-5" />}
          accent="blue"
        />

        <AnalyticsCard
          title="Tasks Completed"
          value={stats.tasksCompleted}
          subtitle="Across all subjects"
          icon={<CheckCircle className="h-5 w-5" />}
          accent="green"
        />

        <AnalyticsCard
          title="Productivity"
          value={stats.productivity}
          subtitle="Estimated score"
          icon={<TrendingUp className="h-5 w-5" />}
          accent="purple"
        />

        <AnalyticsCard
          title="Streak"
          value={`${stats.streak} days`}
          subtitle="Consistency"
          icon={<Flame className="h-5 w-5" />}
          accent="orange"
        />
      </div>

      {/* Subject progress */}
      <Card padding="lg" shadow="md" rounded="lg">
        <h2 className="text-xl font-semibold text-slate-900">
          Subject Progress
        </h2>

        <div className="mt-6 space-y-5">
          {subjectProgress.map((item) => (
            <ProgressBar
              key={item.label}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </Card>

      {/* Weekly overview (dummy chart style) */}
      <Card padding="lg" shadow="md" rounded="lg">
        <h2 className="text-xl font-semibold text-slate-900">
          Weekly Activity
        </h2>

        <div className="mt-6 flex items-end justify-between gap-3">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
            (day, index) => {
              const heights = [40, 60, 30, 80, 50, 70, 45]; // dummy values

              return (
                <div key={day} className="flex flex-col items-center gap-2">
                  <div
                    className="w-6 rounded-lg bg-blue-500"
                    style={{ height: `${heights[index]}px` }}
                  />
                  <span className="text-xs text-slate-500">{day}</span>
                </div>
              );
            }
          )}
        </div>
      </Card>
    </div>
  );
}