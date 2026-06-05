import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 md:pt-20 pt-24">
        <Outlet />
      </main>
    </div>
  );
}
