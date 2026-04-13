import { CheckCircle, RotateCcw } from "lucide-react";
import { useDispatch } from "react-redux";
import { getLoggedInUserSession } from "../../services/storageServices";
import {
  markTopicCompletedForUser,
  markRevisionCompletedForUser,
} from "../../features/subjects/subjectSlice";

export default function StudyPlanCard({ task }) {
  const dispatch = useDispatch();
  const session = getLoggedInUserSession();
  const userId = session?.id;

  if (!task) return null;

  const handleStudyComplete = () => {
    if (task.type !== "Study" || task.completed) return;

    dispatch(
      markTopicCompletedForUser(userId, {
        subjectId: task.subjectId,
        topicId: task.topicId,
      })
    );
  };

  const handleRevisionComplete = () => {
    if (task.type !== "Revision" || task.revisionCompleted) return;

    dispatch(
      markRevisionCompletedForUser(userId, {
        subjectId: task.subjectId,
        topicId: task.topicId,
      })
    );
  };

  const isStudyCompleted = task.type === "Study" && task.completed;
  const isRevisionCompleted =
    task.type === "Revision" && task.revisionCompleted;

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm ${
        isStudyCompleted
          ? "border-green-200 bg-green-50"
          : isRevisionCompleted
          ? "border-amber-200 bg-amber-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <h3 className="font-semibold text-slate-900">{task.subject}</h3>
      <p className="text-sm text-slate-600">{task.topic}</p>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {task.estimatedHours} hr
          </span>

          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              task.type === "Revision"
                ? "bg-amber-100 text-amber-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {task.type}
          </span>
        </div>

        {task.type === "Study" ? (
          task.completed ? (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Completed
            </div>
          ) : (
            <button
              type="button"
              onClick={handleStudyComplete}
              className="flex cursor-pointer items-center gap-1 text-blue-600 hover:text-blue-700"
            >
              <CheckCircle className="h-5 w-5" />
              Mark Complete
            </button>
          )
        ) : task.revisionCompleted ? (
          <div className="flex items-center gap-1 text-amber-600">
            <RotateCcw className="h-5 w-5" />
            Reviewed
          </div>
        ) : (
          <button
            type="button"
            onClick={handleRevisionComplete}
            className="flex cursor-pointer items-center gap-1 text-amber-600 hover:text-amber-700"
          >
            <RotateCcw className="h-5 w-5" />
            Mark Reviewed
          </button>
        )}
      </div>
    </div>
  );
}