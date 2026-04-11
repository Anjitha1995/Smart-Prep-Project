import Card from "../common/Card";
import Input from "../common/Input";

export default function TimerSettingsCard({ timer, updateTimerSettings }) {
  return (
    <Card padding="lg" shadow="md" rounded="lg">
      <h2 className="text-xl font-semibold text-slate-900">
        Timer Settings
      </h2>

      <div className="mt-6 space-y-5">
        <Input
          label="Focus Duration (minutes)"
          name="focusDuration"
          type="number"
          value={timer.focusDuration}
          onChange={(e) =>
            updateTimerSettings("focusDuration", e.target.value)
          }
          placeholder="25"
        />

        <Input
          label="Break Duration (minutes)"
          name="breakDuration"
          type="number"
          value={timer.breakDuration}
          onChange={(e) =>
            updateTimerSettings("breakDuration", e.target.value)
          }
          placeholder="5"
        />
      </div>
    </Card>
  );
}