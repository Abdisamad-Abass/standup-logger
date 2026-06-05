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

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Live updates every 10 seconds
        </div>
      </div>

      {/* Weather */}
      <WeatherCard />
    </div>
  );
}
