import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { FiBarChart2, FiTrendingUp } from "react-icons/fi";

export default function PostsChart({ data }) {
  const totalPosts = data?.reduce((sum, item) => sum + item.posts, 0);

  return (
    <div
      className="
        relative overflow-hidden bg-white
        dark:bg-[#020617] p-5 md:p-6
        rounded-3xl border
        border-[#C1C4D5]
        dark:border-[#2A3142] shadow-sm
        hover:shadow-2xl
        transition-all duration-300
      "
    >
      {/* Background decoration */}
      <div
        className="
          absolute
          -right-12
          -top-12
          w-40
          h-40
          rounded-full
          bg-blue-100
          dark:bg-blue-900/20
          opacity-50
        "
      />

      {/* Header */}
      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between

          mb-6
        "
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className="w-10 h-10
              md:w-14
              md:h-14
              rounded-2xl
              flex
              items-center
              justify-center
              bg-gradient-to-br
              from-blue-500
              to-indigo-600
              text-white
              text-2xl
              shadow-lg
            "
          >
            <FiBarChart2 />
          </div>

          <div>
            <h2
              className="
                text-lg md:text-xl
                md:font-bold font-semibold
                text-gray-900
                dark:text-white
              "
            >
              Posts Analytics
            </h2>

            <p
              className="
                text-xs md:text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              Last 7 days performance
            </p>
          </div>
        </div>

        {/* Summary */}
        <div
          className="
            flex sm:flex items-center gap-2 px-2 py-1 md:px-4 md:py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20
            text-blue-600 dark:text-blue-400"
        >
          <FiTrendingUp />

          <div>
            <p className="text-xs">Total</p>

            <p className="font-bold">{totalPosts}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={35}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.12}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9CA3AF",
                fontSize: 12,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#9CA3AF",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(37,99,235,0.08)",
              }}
              contentStyle={{
                background: "#020617",

                border: "1px solid #2A3142",

                borderRadius: "16px",

                padding: "14px",

                color: "#fff",

                boxShadow: "0 20px 40px rgba(0,0,0,.3)",
              }}
              labelStyle={{
                color: "#93C5FD",
                fontWeight: "700",
              }}
              itemStyle={{
                color: "#60A5FA",
              }}
            />

            <Bar
              dataKey="posts"
              radius={[10, 10, 0, 0]}
              animationDuration={1000}
            >
              {data?.map((entry, index) => (
                <Cell
                  key={index}
                  fill={index % 2 === 0 ? "#2563EB" : "#6366F1"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
