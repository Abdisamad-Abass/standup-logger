import { useState } from "react";
import FeedHeader from "../components/FeedHeader";
import StandupForm from "../components/StandupForm";
import ActivityFeed from "../components/ActivityFeed";
import { useAuth } from "../context/AuthContext";

export default function FeedPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <div className="space-y-6">
      <FeedHeader />

      <div
        className={`grid gap-6 ${
          isAdmin ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"
        }`}
      >
        {/* LEFT SIDE ONLY FOR MEMBERS */}
        {!isAdmin && (
          <div className="lg:col-span-1">
            <StandupForm onSuccess={() => setRefreshKey((r) => r + 1)} />
          </div>
        )}

        {/* RIGHT SIDE  */}
        <div className={isAdmin ? "w-full" : "lg:col-span-2"}>
          <ActivityFeed refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}
