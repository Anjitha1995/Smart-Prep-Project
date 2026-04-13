import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  Timer,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";
import logoIcon from "../../assets/images/logoIcon.png";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Subjects",
    path: "/subjects",
    icon: BookOpen,
  },
  {
    label: "Study Plan",
    path: "/study-plan",
    icon: CalendarCheck,
  },
  {
    label: "Focus Timer",
    path: "/focus-timer",
    icon: Timer,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function SidebarContent({ onLinkClick }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-md">
          <img
            src={logoIcon}
            alt="SmartPrep"
            className="h-7 w-7 object-contain"
          />
        </div>

        <div>
          <h1 className="text-lg font-bold text-slate-900">SmartPrep</h1>
          <p className="text-xs text-slate-500">Study smarter</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onLinkClick}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`h-5 w-5 transition ${
                      isActive
                        ? "text-white"
                        : "text-slate-500 group-hover:text-slate-900"
                    }`}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white shadow-lg">
        <p className="text-sm font-semibold">Stay consistent</p>
        <p className="mt-2 text-xs leading-5 text-blue-100">
          Track your study plan, complete focus sessions, and monitor progress
          daily.
        </p>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 shadow-md">
            <img
              src={logoIcon}
              alt="SmartPrep"
              className="h-6 w-6 object-contain"
            />
          </div>

          <div>
            <h1 className="text-base font-bold text-slate-900">SmartPrep</h1>
            <p className="text-[11px] text-slate-500">Study smarter</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed left-0 top-0 z-[60] h-full w-72 transform border-r border-slate-200 bg-white px-5 py-6 shadow-xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <SidebarContent onLinkClick={() => setIsOpen(false)} />
      </div>

      {/* Desktop sticky sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col">
        <SidebarContent />
      </aside>
    </>
  );
}