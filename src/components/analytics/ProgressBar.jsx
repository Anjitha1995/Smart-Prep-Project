export default function ProgressBar({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-700 font-medium">{label}</span>
        <span className="text-slate-500">{value}%</span>
      </div>

      <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-blue-600"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}