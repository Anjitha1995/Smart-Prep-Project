import Card from "../common/Card";
import { BookOpen, Calendar, Pencil, Trash2 } from "lucide-react";
import { formatDateDDMMYY } from "../../utils/dateUtils";

export default function SubjectCard({ subject, onDelete, onEdit }) {
  return (
    <Card padding="md" shadow="md" rounded="lg" className="h-full">
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <BookOpen className="h-5 w-5" />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(subject)}
                className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-500"
              >
                <Pencil className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => onDelete(subject.id)}
                className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            {subject.name}
          </h3>

          <div className="mt-3 space-y-2 text-sm text-slate-500">
            <p>{subject.totalTopics} topics</p>
            <p>Difficulty: {subject.difficulty}</p>
            <p>Priority: {subject.priority}</p>
            <p>Daily hours: {subject.dailyStudyHours}</p>
            <p>Progress: {subject.progress ?? 0}%</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="h-4 w-4" />
            <span>{formatDateDDMMYY(subject.examDate)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}