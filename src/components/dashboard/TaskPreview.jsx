import Card from "../common/Card";
import Button from "../common/Button";

export default function TasksPreview({ tasks = [] }) {
  return (
    <Card className="h-full" padding="lg" shadow="md" rounded="lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Today's Tasks</h2>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No tasks for today.
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <div>
                <p className="font-medium text-slate-800">
                  {task.subject} - {task.topic}
                </p>
                <p className="text-xs text-slate-500">{task.type}</p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  task.type === "Study"
                    ? task.completed
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                    : task.revisionCompleted
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {task.type === "Study"
                  ? task.completed
                    ? "Done"
                    : "Pending"
                  : task.revisionCompleted
                  ? "Reviewed"
                  : "Pending"}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}