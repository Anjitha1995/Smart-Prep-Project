import { useEffect, useState } from "react";
import Button from "../components/common/Button";
import ProfileSettingsCard from "../components/settings/ProfileSettingsCard";
import StudyPreferencesCard from "../components/settings/studyPreferencesCard";
import TimerSettingsCard from "../components/settings/TimerSettingsCard";
import NotificationSettingsCard from "../components/settings/NotificationSettingsCard";
import {
  getSettings,
  saveSettings,
  resetSettings,
} from "../services/settingsStorageService";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    profile: {
      fullName: "",
      email: "",
    },
    studyPreferences: {
      dailyStudyHours: "",
      preferredStudyTime: "",
    },
    timer: {
      focusDuration: "",
      breakDuration: "",
    },
    notifications: {
      taskReminders: false,
      revisionAlerts: false,
      dailySummary: false,
    },
  });

  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const storedSettings = getSettings();
    setSettings(storedSettings);
  }, []);

  const updateProfile = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const updateStudyPreferences = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      studyPreferences: {
        ...prev.studyPreferences,
        [field]: value,
      },
    }));
  };

  const updateTimerSettings = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      timer: {
        ...prev.timer,
        [field]: value,
      },
    }));
  };

  const updateNotifications = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value,
      },
    }));
  };

  const handleSaveAll = () => {
    saveSettings(settings);
    setSavedMessage("Settings saved successfully.");
    setTimeout(() => setSavedMessage(""), 2500);
  };

  const handleReset = () => {
    const defaults = resetSettings();
    setSettings(defaults);
    setSavedMessage("Settings reset to default values.");
    setTimeout(() => setSavedMessage(""), 2500);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="mt-2 text-slate-600">
            Manage your profile, preferences, timer, and notifications.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSaveAll}>Save All</Button>
        </div>
      </div>

      {savedMessage && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {savedMessage}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <ProfileSettingsCard
          profile={settings.profile}
          updateProfile={updateProfile}
        />

        <StudyPreferencesCard
          studyPreferences={settings.studyPreferences}
          updateStudyPreferences={updateStudyPreferences}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <TimerSettingsCard
          timer={settings.timer}
          updateTimerSettings={updateTimerSettings}
        />

        <NotificationSettingsCard
          notifications={settings.notifications}
          updateNotifications={updateNotifications}
        />
      </div>
    </div>
  );
}