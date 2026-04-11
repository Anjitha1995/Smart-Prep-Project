import Card from "../common/Card";
import Input from "../common/Input";

export default function ProfileSettingsCard({ profile, updateProfile }) {
  return (
    <Card padding="lg" shadow="md" rounded="lg">
      <h2 className="text-xl font-semibold text-slate-900">
        Profile Settings
      </h2>

      <div className="mt-6 space-y-5">
        <Input
          label="Full Name"
          name="fullName"
          value={profile.fullName}
          onChange={(e) => updateProfile("fullName", e.target.value)}
          placeholder="Enter your full name"
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={profile.email}
          onChange={(e) => updateProfile("email", e.target.value)}
          placeholder="Enter your email"
        />
      </div>
    </Card>
  );
}