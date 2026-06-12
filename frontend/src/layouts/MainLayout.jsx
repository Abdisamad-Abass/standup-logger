import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F8F9FF] dark:bg-[#0A0C10] transition-colors">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 md:pt-24 pt-24">
        <Outlet />
      </main>
    </div>
  );
}
