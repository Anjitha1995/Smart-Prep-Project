import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                <div>
                    <p className="text-lg font-semibold text-slate-900">SmartPrep</p>
                    <p className="mt-1 text-sm text-slate-500">
                        A smart study planner frontend prototype built with React.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                    <Link to="/" className="hover:text-slate-900">
                        Home
                    </Link>
                    <Link to="/login" className="hover:text-slate-900">
                        Login
                    </Link>
                    <Link to="/register" className="hover:text-slate-900">
                        Register
                    </Link>
                </div>

                <p className="text-sm text-slate-500">
                    &copy; 2026 SmartPrep. All rights reserved.
                </p>
            </div>
        </footer>
    );
}