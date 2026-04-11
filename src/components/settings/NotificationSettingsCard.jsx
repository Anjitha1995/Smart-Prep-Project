import Card from "../common/Card";

export default function NotificationSettingsCard({
  notifications,
  updateNotifications,
}) {
  return (
    <Card padding="lg" shadow="md" rounded="lg">
      <h2 className="text-xl font-semibold text-slate-900">
        Notifications
      </h2>

      <div className="mt-6 space-y-5">
        <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <span className="text-sm font-medium text-slate-700 sm:text-base">
            Task Reminders
          </span>
          <input
            type="checkbox"
            checked={notifications.taskReminders}
            onChange={(e) =>
              updateNotifications("taskReminders", e.target.checked)
            }
            className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
        </label>

        <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <span className="text-sm font-medium text-slate-700 sm:text-base">
            Revision Alerts
          </span>
          <input
            type="checkbox"
            checked={notifications.revisionAlerts}
            onChange={(e) =>
              updateNotifications("revisionAlerts", e.target.checked)
            }
            className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
        </label>

        <label className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
          <span className="text-sm font-medium text-slate-700 sm:text-base">
            Daily Summary
          </span>
          <input
            type="checkbox"
            checked={notifications.dailySummary}
            onChange={(e) =>
              updateNotifications("dailySummary", e.target.checked)
            }
            className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
        </label>
      </div>
    </Card>
  );
}