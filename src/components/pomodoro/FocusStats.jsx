import Card from "../common/Card";
import { Timer, CheckCircle2, BarChart3 } from "lucide-react";

export default function FocusStats() {
  const stats = [
    {
      title: "Completed Sessions",
      value: "4",
      subtitle: "Today",
      icon: <CheckCircle2 className="h-5 w-5" />,
      accent: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Total Focus Time",
      value: "100 min",
      subtitle: "Accumulated today",
      icon: <Timer className="h-5 w-5" />,
      accent: "bg-blue-50 text-blue-600",
    },
    {
      title: "Productivity Score",
      value: "82",
      subtitle: "Estimated",
      icon: <BarChart3 className="h-5 w-5" />,
      accent: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.title} padding="md" shadow="md" rounded="lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">{stat.title}</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {stat.value}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{stat.subtitle}</p>
            </div>

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.accent}`}
            >
              {stat.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}