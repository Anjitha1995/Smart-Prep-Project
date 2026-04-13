import Card from "../common/Card";
import Button from "../common/Button";
import { Timer } from "lucide-react";
import { Link } from "react-router-dom";

export default function FocusWidget({
  time = "25:00",
  sessions = 0,
  totalMinutes = 0,
}) {
  return (
    <Card
      className="h-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
      padding="lg"
      shadow="lg"
      rounded="lg"
      border={false}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Focus Timer</h2>
          </div>

          <p className="mt-6 text-5xl font-bold tracking-tight">{time}</p>

          <div className="mt-4 space-y-1 text-sm text-blue-100">
            <p>Sessions today: {sessions}</p>
            <p>Total focus time: {totalMinutes} min</p>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/focus-timer">
            <Button
              variant="secondary"
              className="w-full border-white bg-white text-blue-700 hover:bg-blue-50"
            >
              Open Timer
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}