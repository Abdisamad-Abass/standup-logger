import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function BlockersChart({ data }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 p-5 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
          Blocker Frequency
        </h2>

        <span className="text-xs px-2 py-1 rounded-full bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300">
          Analytics
        </span>
      </div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6}>
            {/* Cartesian Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.15}
            />

            {/* X Axis */}
            <XAxis
              dataKey="date"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />

            {/* Y Axis */}
            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              dx={-5}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ fill: "rgba(239, 68, 68, 0.08)" }}
              contentStyle={{
                backgroundColor: "#0B1220",
                border: "1px solid #1F2937",
                borderRadius: "10px",
                color: "#fff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              }}
              labelStyle={{
                color: "#E5E7EB",
                fontWeight: "bold",
              }}
              itemStyle={{ color: "#F87171" }}
            />

            {/* Bar */}
            <Bar
              dataKey="blockers"
              fill="#EF4444"
              radius={[6, 6, 0, 0]}
              activeBar={{ fill: "#DC2626" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
