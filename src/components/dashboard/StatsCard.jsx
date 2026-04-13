import Card from "../common/Card";

export default function StatsCard({
  title,
  value,
  subtitle = "",
  icon = null,
  accent = "blue",
}) {
  const accentClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    orange: "bg-amber-50 text-amber-600",
  };

  return (
    <Card className="h-full" padding="md" shadow="md" rounded="lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>
          {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
        </div>

        {icon && (
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              accentClasses[accent] || accentClasses.blue
            }`}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}