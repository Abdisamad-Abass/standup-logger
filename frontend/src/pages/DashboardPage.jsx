import useStats from "../hooks/useStats";
import StatCard from "../components/StatCard";
import PostsChart from "../components/PostsChart";
import BlockersChart from "../components/BlockersChart";
import TeamActivityChart from "../components/TeamActivityChart";
import useMemberCount from "../hooks/useMemberCount";

export default function DashboardPage() {
  const { stats, loading, error } = useStats();
  const { count: memberCount } = useMemberCount();

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 rounded-xl shadow animate-pulse transition-colors">
        Loading dashboard...
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-xl transition-colors">
        Failed to load dashboard stats
      </div>
    );
  }

  // Calculate metrics
  const totalPosts = stats.total_posts || 0;
  const totalBlockers = stats.total_blockers || 0;

  const teamHealth =
    totalPosts === 0
      ? 100
      : Math.round(((totalPosts - totalBlockers) / totalPosts) * 100);

  return (
    <div className="space-y-6 text-gray-900 dark:text-white transition-colors">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Productivity Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Team performance overview (last 7 days)
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Posts" value={totalPosts} color="blue" />

        <StatCard title="Blockers" value={totalBlockers} color="red" />

        <StatCard title="Team Health" value={`${teamHealth}%`} color="green" />

        <StatCard
          title="Avg Posts/Day"
          value={Math.round(totalPosts / 7 || 0)}
          color="yellow"
        />

        <StatCard title="Total Members" value={memberCount} color="blue" />
      </div>

      {/* Chart */}
      <PostsChart data={stats.posts_per_day} />
      <BlockersChart data={stats.blockers_per_day} />
      <TeamActivityChart data={stats.team_activity} />
    </div>
  );
}
