export default function StatCard({ title, value, color = "blue" }) {
  const colors = {
    blue: "text-blue-600",
    red: "text-red-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border border-gray-100 dark:border-gray-800 transition-colors text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h2 className={`text-2xl font-bold ${colors[color]}`}>{value}</h2>
    </div>
  );
}
