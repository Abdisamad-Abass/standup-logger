import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TeamActivityChart({ data }) {
  return (
    <div
      className="
        relative overflow-hidden

        bg-white
        dark:bg-[#020617]

        p-6

        rounded-3xl

        border
        border-gray-200
        dark:border-[#1F2937]

        shadow-sm
        hover:shadow-2xl

        transition-all duration-300
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Team Activity
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Posts contribution by team members
          </p>
        </div>

        <span
          className="
            text-xs
            px-3 py-1

            rounded-full

            bg-blue-50
            text-blue-600
            dark:bg-blue-900/20
            dark:text-blue-300
          "
        >
          Live Data
        </span>
      </div>

      {/* Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={30}>
            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.12}
            />

            {/* X Axis */}
            <XAxis
              dataKey="author"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9CA3AF",
                fontSize: 12,
              }}
              dy={10}
            />

            {/* Y Axis */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9CA3AF",
                fontSize: 12,
              }}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ fill: "rgba(59,130,246,0.08)" }}
              contentStyle={{
                backgroundColor: "#0B1220",
                border: "1px solid #1F2937",
                borderRadius: "12px",
                color: "#fff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
              labelStyle={{
                color: "#93C5FD",
                fontWeight: "bold",
              }}
              itemStyle={{
                color: "#60A5FA",
              }}
            />

            {/* Bar */}
            <Bar
              dataKey="posts"
              fill="#3B82F6"
              radius={[8, 8, 0, 0]}
              animationDuration={900}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
