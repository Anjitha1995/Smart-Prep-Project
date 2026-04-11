import Card from "../common/Card";
import { Clock3, Coffee, Flame } from "lucide-react";

export default function SessionSummary() {
  const items = [
    {
      title: "Current Mode",
      value: "Work",
      icon: <Clock3 className="h-5 w-5" />,
      accent: "bg-blue-50 text-blue-600",
    },
    {
      title: "Next Break",
      value: "5 min",
      icon: <Coffee className="h-5 w-5" />,
      accent: "bg-amber-50 text-amber-600",
    },
    {
      title: "Streak",
      value: "3 Sessions",
      icon: <Flame className="h-5 w-5" />,
      accent: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title} padding="md" shadow="md" rounded="lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{item.title}</p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {item.value}
              </h3>
            </div>

            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.accent}`}
            >
              {item.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}