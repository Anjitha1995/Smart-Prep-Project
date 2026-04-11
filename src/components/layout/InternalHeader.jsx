import { useNavigate } from "react-router-dom";
import { LogOut, Bell } from "lucide-react";
import Button from "../common/Button";
import { clearSessionOnLogout, getStoredSession } from "../../utils/authUtil";

export default function InternalHeader() {
  const navigate = useNavigate();
  const session = getStoredSession();

  const handleLogout = () => {
    clearSessionOnLogout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Welcome back{session?.name ? `, ${session.name}` : ""}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
          >
            <Bell className="h-5 w-5" />
          </button>

          <Button
            variant="secondary"
            className="px-6 py-4"
            leftIcon={<LogOut className="h-5 w-5 shrink-0" />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}