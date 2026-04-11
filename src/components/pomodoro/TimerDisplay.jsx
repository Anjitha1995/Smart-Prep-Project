import Card from "../common/Card";

export default function TimerDisplay({
  time = "25:00",
  mode = "Focus Session",
}) {
  return (
    <Card
      padding="xl"
      shadow="lg"
      rounded="xl"
      className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
      border={false}
    >
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-100">
          {mode}
        </p>

        <h2 className="mt-6 text-6xl font-extrabold tracking-tight sm:text-7xl">
          {time}
        </h2>

        <p className="mt-4 text-sm text-blue-100 sm:text-base">
          Stay focused and complete your session.
        </p>
      </div>
    </Card>
  );
}