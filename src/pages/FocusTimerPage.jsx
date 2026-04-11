import TimerDisplay from "../components/pomodoro/TimerDisplay";
import TimerControls from "../components/pomodoro/TimerControls";
import SessionSummary from "../components/pomodoro/SessionSummary";
import FocusStats from "../components/pomodoro/FocusStats";

export default function FocusTimerPage() {
  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Focus Timer</h1>
        <p className="mt-2 text-slate-600">
          A Pomodoro-style timer interface to help you stay focused during study sessions.
        </p>
      </div>

      {/* Top summary */}
      <SessionSummary />

      {/* Main timer section */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <TimerDisplay time="25:00" mode="Focus Session" />
        <TimerControls />
      </div>

      {/* Stats */}
      <FocusStats />
    </div>
  );
}