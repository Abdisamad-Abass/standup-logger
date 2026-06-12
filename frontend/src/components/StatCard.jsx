import {
  FiFileText,
  FiUsers,
  FiAlertTriangle,
  FiCheckCircle,
  FiActivity,
} from "react-icons/fi";

export default function StatCard({ title, value, color = "blue" }) {
  const styles = {
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      icon: <FiFileText />,
    },

    red: {
      text: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/30",
      icon: <FiAlertTriangle />,
    },

    green: {
      text: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
      icon: <FiCheckCircle />,
    },

    yellow: {
      text: "text-yellow-600",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      icon: <FiActivity />,
    },
    users: {
      text: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      icon: <FiUsers />,
    },
  };

  const current = styles[color];

  return (
    <div
      className="
        relative overflow-hidden
        bg-white dark:bg-[#020617] p-5
        rounded-2xl border border-[#D9DBE6] dark:border-[#262D3E] shadow-sm hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      {/* top section */}
      <div className="flex items-center justify-between">
        {/* Icon */}
        <div
          className={`
            w-12 h-12
            rounded-xl
            flex items-center justify-center
            text-xl
            ${current.text}
            ${current.bg}

            shadow-sm
          `}
        >
          {current.icon}
        </div>

        <div className="flex flex-col items-center gap-2">
          {/* Title */}
          <p
            className="
          mt-4
          text-sm
          font-medium
          text-gray-500
          dark:text-gray-400
        "
          >
            {title}
          </p>

          {/* Value */}
          <h2
            className={`
            text-3xl
            font-bold
            ${current.text}
          `}
          >
            {value}
          </h2>
        </div>
      </div>

      {/* decorative circle */}
      <div
        className="
          absolute -right-6 -bottom-6
          w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-800
          opacity-40
        "
      />
    </div>
  );
}
