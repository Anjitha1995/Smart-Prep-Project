import Header from "./Header";
import Footer from "./Footer";
import Card from "../common/Card";

export default function AuthLayout({
  title,
  subtitle,
  sideTitle,
  sideDescription,
  children,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />

      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          
          {/* LEFT SIDE (hidden on mobile) */}
          <div className="hidden lg:block">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
                SmartPrep Platform
              </span>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900">
                {sideTitle}
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                {sideDescription}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE (FORM) */}
          <Card
            className="mx-auto w-full max-w-2xl"
            padding="xl"
            shadow="xl"
            rounded="xl"
          >
            <div className="mx-auto w-full max-w-xl">
              
              {/* FORM HEADER */}
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                  {title}
                </h2>
                <p className="mt-3 text-slate-600">{subtitle}</p>
              </div>

              {/* FORM CONTENT */}
              {children}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}