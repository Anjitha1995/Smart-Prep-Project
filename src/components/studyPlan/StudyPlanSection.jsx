import StudyPlanCard from "./StudyPlanCard";
import { formatDateDDMMYY } from "../../utils/dateUtils";

export default function StudyPlanSection({ title, data = [] }) {
  if (!data.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-xl font-semibold text-slate-800">
        {title}
      </div>

      {data.map((day) => (
        <div key={day.date} className="space-y-3">
          <p className="text-sm font-medium text-slate-500">
            {formatDateDDMMYY(day.date)}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {day.tasks?.filter(Boolean).map((task) => (
              <StudyPlanCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}