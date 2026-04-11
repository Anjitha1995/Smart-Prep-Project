import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import Button from "../common/Button";
import Card from "../common/Card";

export default function TimerControls() {
  return (
    <Card padding="md" shadow="md" rounded="lg">
      <h3 className="text-lg font-semibold text-slate-900">Controls</h3>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button
          className="w-full"
          leftIcon={<Play className="h-4 w-4" />}
        >
          Start
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          leftIcon={<Pause className="h-4 w-4" />}
        >
          Pause
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          leftIcon={<RotateCcw className="h-4 w-4" />}
        >
          Reset
        </Button>

        <Button
          variant="ghost"
          className="w-full"
          leftIcon={<SkipForward className="h-4 w-4" />}
        >
          Skip
        </Button>
      </div>
    </Card>
  );
}