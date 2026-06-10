import WeatherCard from "./WeatherCard";
import { format } from "date-fns";

export default function FeedHeader() {
  return (
    <div className="space-y-4 mb-6">
      {/* Top Info Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Team Standup Feed
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {format(new Date(), "EEEE, MMMM do yyyy")}
          </p>
        </div>

        {/* LIVE STATUS */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          {/* Green pulsing dot */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>

          <span className="font-medium text-green-600 dark:text-green-400">
            Live
          </span>

          <span className="text-gray-500 dark:text-gray-400">
            • updates every 10 seconds
          </span>
        </div>
      </div>

      {/* Weather */}
      <WeatherCard />
    </div>
  );
}
