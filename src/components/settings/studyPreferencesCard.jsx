import Card from "../common/Card";
import Input from "../common/Input";

export default function StudyPreferencesCard({
  studyPreferences,
  updateStudyPreferences,
}) {
  return (
    <Card padding="lg" shadow="md" rounded="lg">
      <h2 className="text-xl font-semibold text-slate-900">
        Study Preferences
      </h2>

      <div className="mt-6 space-y-5">
        <Input
          label="Daily Study Hours"
          name="dailyStudyHours"
          type="number"
          value={studyPreferences.dailyStudyHours}
          onChange={(e) =>
            updateStudyPreferences("dailyStudyHours", e.target.value)
          }
          placeholder="Enter study hours"
        />

        <div>
          <label className="block text-base font-semibold text-slate-800 sm:text-lg">
            Preferred Study Time
          </label>

          <select
            value={studyPreferences.preferredStudyTime}
            onChange={(e) =>
              updateStudyPreferences("preferredStudyTime", e.target.value)
            }
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-base text-slate-900 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:px-5 sm:py-4 sm:text-lg"
          >
            <option value="">Select preferred time</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>
      </div>
    </Card>
  );
}