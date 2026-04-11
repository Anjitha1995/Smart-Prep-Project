import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import HeroSection from "../components/home/HeroSection";
import FeatureCard from "../components/home/FeatureCard";
import {
  BookOpen,
  Brain,
  Timer,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";

export default function HomePage() {

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <HeroSection />

      <section id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 scroll-mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
            Features
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
            Everything you need to stay organized
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            SmartPrep helps students plan, focus, and track progress with a clean dashboard experience.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <FeatureCard
            icon={<BookOpen className="h-6 w-6" />}
            title="Subject Management"
            description="Add subjects, syllabus topics, and exam dates in one organized place."
          />

          <FeatureCard
            icon={<Brain className="h-6 w-6" />}
            title="Smart Study Planning"
            description="Generate structured plans based on subject load and deadlines."
          />

          <FeatureCard
            icon={<Timer className="h-6 w-6" />}
            title="Focus Timer"
            description="Pomodoro-style focus sessions."
          />

          <FeatureCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Progress Analytics"
          />

          <FeatureCard
            icon={<Bell className="h-6 w-6" />}
            title="Notifications"
          />

          <FeatureCard
            icon={<Settings className="h-6 w-6" />}
            title="Custom Settings"
          />
        </div>
      </section>

      <section id="about" className="bg-white scroll-mt-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              About SmartPrep
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Designed for a clean student workflow
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              SmartPrep is a React-based study planner prototype focused on usability,
              clarity, and productivity. It combines structured planning, focus tracking,
              and analytics into a modern dashboard-based experience.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="space-y-5">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="font-semibold text-slate-900">Frontend-first architecture</p>
                <p className="mt-2 text-sm text-slate-600">
                  Built to work now with local storage and prepared for future backend integration.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="font-semibold text-slate-900">Reusable component system</p>
                <p className="mt-2 text-sm text-slate-600">
                  Shared Button, Input, Card, Header, and Footer components keep the UI consistent.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="font-semibold text-slate-900">Student-friendly UX</p>
                <p className="mt-2 text-sm text-slate-600">
                  Responsive layouts, clear forms, and a soft visual style improve usability across devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}