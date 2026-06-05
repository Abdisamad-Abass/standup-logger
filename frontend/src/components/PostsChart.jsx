import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PostsChart({ data }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border border-gray-300 dark:border-gray-800 transition-colors">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Posts Per Day (Last 7 Days)
      </h2>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/* X Axis */}
            <XAxis dataKey="date" tick={{ fill: "#9CA3AF" }} />

            {/* Y Axis */}
            <YAxis tick={{ fill: "#9CA3AF" }} />

            {/* Tooltip  */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#fff",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#60A5FA" }}
            />

            {/* Bar */}
            <Bar dataKey="posts" fill="#2563EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
