const SETTINGS_KEY = "smartprep_settings";

const defaultSettings = {
  profile: {
    fullName: "Anjitha kaippullypady Sarasan",
    email: "anji.ashi@gmail.com",
  },
  studyPreferences: {
    dailyStudyHours: "3",
    preferredStudyTime: "Evening",
  },
  timer: {
    focusDuration: "25",
    breakDuration: "5",
  },
  notifications: {
    taskReminders: true,
    revisionAlerts: true,
    dailySummary: false,
  },
};

export function getSettings() {
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? JSON.parse(stored) : defaultSettings;
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function resetSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
  return defaultSettings;
}