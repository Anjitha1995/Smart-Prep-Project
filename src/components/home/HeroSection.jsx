import { Link } from "react-router-dom";
import Button from "../common/Button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <div className="absolute -left-16 top-16 h-72 w-72 animate-pulse rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute right-0 top-0 h-80 w-80 animate-pulse rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 animate-bounce rounded-full bg-cyan-100/30 blur-3xl [animation-duration:5s]" />

      <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="animate-[fadeInUp_0.8s_ease-out]">
          <span className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
            Smart Study Planning for Students
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Study smarter with
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SmartPrep
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Organize subjects, generate study plans, track focus sessions, and
            monitor progress with a clean and modern study dashboard.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link to="/register">
              <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
            <span>✓ Study plan generation</span>
            <span>✓ Focus timer</span>
            <span>✓ Progress analytics</span>
          </div>
        </div>

        <div className="relative animate-[fadeIn_1s_ease-out]">
          <div className="rounded-[32px] border border-white/60 bg-white/80 p-5 shadow-2xl backdrop-blur-md">
            <div className="rounded-[28px] bg-slate-50 p-4 sm:p-6">
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-slate-500">Tasks Today</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">05</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-slate-500">Focus Time</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">2h 15m</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs text-slate-500">Progress</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">68%</p>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-lg font-semibold text-slate-900">Today’s Tasks</p>
                    <div className="mt-4 space-y-3">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        ☐ Physics - Thermodynamics
                      </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        ☑ Math - Limits
                      </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                        ☐ Chemistry - Organic Basics
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white shadow-sm">
                    <p className="text-lg font-semibold">Focus Timer</p>
                    <p className="mt-6 text-5xl font-bold">25:00</p>
                    <button className="mt-6 rounded-2xl bg-white px-5 py-3 font-semibold text-blue-600 transition hover:bg-slate-100">
                      Start Focus
                    </button>
                    <p className="mt-4 text-sm text-blue-100">Sessions today: 3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(24px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.96); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}