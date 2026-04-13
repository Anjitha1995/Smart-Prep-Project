import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Flame, Clock3, CalendarDays, CheckCircle2 } from "lucide-react";
import {
  selectStudyPlan,
  selectGroupedStudyPlan,
} from "../features/studyPlan/studyPlanSelectors";
import StudyPlanSection from "../components/studyPlan/StudyPlanSection";

export default function StudyPlanPage() {
  const plan = useSelector(selectStudyPlan);
  const groupedPlan = useSelector(selectGroupedStudyPlan);

  const splitTasksByStatus = (days = []) => {
    return days
      .map((day) => {
        const pendingTasks = day.tasks.filter((task) => {
          if (task.type === "Study") return !task.completed;
          if (task.type === "Revision") return !task.revisionCompleted;
          return true;
        });

        const completedTasks = day.tasks.filter((task) => {
          if (task.type === "Study") return task.completed;
          if (task.type === "Revision") return task.revisionCompleted;
          return false;
        });

        return {
          date: day.date,
          pendingTasks,
          completedTasks,
        };
      })
      .filter((day) => day.pendingTasks.length > 0 || day.completedTasks.length > 0);
  };

  const todayTasks = useMemo(() => splitTasksByStatus(groupedPlan.today), [groupedPlan.today]);
  const tomorrowTasks = useMemo(() => splitTasksByStatus(groupedPlan.tomorrow), [groupedPlan.tomorrow]);
  const upcomingTasks = useMemo(() => splitTasksByStatus(groupedPlan.upcoming), [groupedPlan.upcoming]);

  const hasAnyTasks =
    todayTasks.length > 0 || tomorrowTasks.length > 0 || upcomingTasks.length > 0;

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Study Plan</h1>
        <p className="mt-2 text-slate-600">Your personalized study schedule.</p>
      </div>

      {!hasAnyTasks ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">
          No study plan available. Add subjects and topics first.
        </div>
      ) : (
        <>
          {todayTasks.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-red-500">
                <Flame className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Today</h2>
              </div>

              <StudyPlanSection
                title={<span className="text-slate-800">Pending Tasks</span>}
                data={todayTasks
                  .map((day) => ({ date: day.date, tasks: day.pendingTasks }))
                  .filter((day) => day.tasks.length > 0)}
              />

              <StudyPlanSection
                title={
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Completed Tasks</span>
                  </div>
                }
                data={todayTasks
                  .map((day) => ({ date: day.date, tasks: day.completedTasks }))
                  .filter((day) => day.tasks.length > 0)}
              />
            </div>
          )}

          {tomorrowTasks.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-blue-600">
                <Clock3 className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Tomorrow</h2>
              </div>

              <StudyPlanSection
                title={<span className="text-slate-800">Pending Tasks</span>}
                data={tomorrowTasks
                  .map((day) => ({ date: day.date, tasks: day.pendingTasks }))
                  .filter((day) => day.tasks.length > 0)}
              />

              <StudyPlanSection
                title={
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Completed Tasks</span>
                  </div>
                }
                data={tomorrowTasks
                  .map((day) => ({ date: day.date, tasks: day.completedTasks }))
                  .filter((day) => day.tasks.length > 0)}
              />
            </div>
          )}

          {upcomingTasks.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-slate-700">
                <CalendarDays className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Upcoming</h2>
              </div>

              <StudyPlanSection
                title={<span className="text-slate-800">Pending Tasks</span>}
                data={upcomingTasks
                  .map((day) => ({ date: day.date, tasks: day.pendingTasks }))
                  .filter((day) => day.tasks.length > 0)}
              />

              <StudyPlanSection
                title={
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Completed Tasks</span>
                  </div>
                }
                data={upcomingTasks
                  .map((day) => ({ date: day.date, tasks: day.completedTasks }))
                  .filter((day) => day.tasks.length > 0)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}