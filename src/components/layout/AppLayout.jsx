import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import InternalHeader from "./InternalHeader";
import InternalFooter from "./InternalFooter";
import DashboardDataLoader from "./DashboardDataLoader";

export default function AppLayout() {
  return (
    <DashboardDataLoader>
      <div className="min-h-screen bg-slate-50 lg:flex">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <InternalHeader />

          <div className="flex min-h-screen flex-1 flex-col">
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
              <Outlet />
            </main>
          </div>

          <InternalFooter />
        </div>
      </div>
    </DashboardDataLoader>
  );
}