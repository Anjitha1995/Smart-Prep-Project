import Card from "../common/Card";

export default function UpcomingExams({ exams = [] }) {
  return (
    <Card className="h-full" padding="lg" shadow="md" rounded="lg">
      <h2 className="text-xl font-semibold text-slate-900">Upcoming Exams</h2>

      <div className="mt-5 space-y-3">
        {exams.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No upcoming exams added yet.
          </div>
        ) : (
          exams.map((exam) => (
            <div
              key={exam.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
            >
              <div>
                <p className="font-semibold text-slate-900">{exam.subject}</p>
                <p className="text-sm text-slate-500">{exam.date}</p>
              </div>

              <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {exam.daysLeft} days
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}