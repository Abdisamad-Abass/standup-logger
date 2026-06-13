import WeatherCard from "./WeatherCard";
import { format } from "date-fns";

export default function FeedHeader() {
  const now = new Date();

  const location = "Nairobi, Kenya";
  const time = format(now, "hh:mm a");
  const date = format(now, "MMM dd, yyyy");
  const day = format(now, "EEEE");
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-5 md:gap-6">
          <div>
            {/* LIVE STATUS */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>

                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>

              <span className="font-medium text-green-600 dark:text-green-400">
                LIVE SYSTEM UPDATES
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Team Standup Feed
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {location} • {time} • {date} • {day}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-auto flex md:justify-end items-center h-full">
          <div className="w-full md:w-auto">
            <WeatherCard />
          </div>
        </div>
      </div>
    </div>
  );
}
