import Card from "../common/Card";

export default function AnalyticsCard({
  title,
  value,
  subtitle,
  icon,
  accent = "blue",
}) {
  const accentClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    orange: "bg-amber-50 text-amber-600",
  };

  return (
    <Card padding="md" shadow="md" rounded="lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accentClasses[accent]}`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}