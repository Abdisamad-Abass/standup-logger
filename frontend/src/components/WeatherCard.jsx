import useWeather from "../hooks/useWeather";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiDayCloudy,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";

export default function WeatherCard() {
  const { weather, loading, error } = useWeather();

  const getIcon = (code) => {
    if (code === 0)
      return <WiDaySunny className="animate-pulse text-yellow-500" />;

    if (code <= 2)
      return <WiDayCloudy className="animate-pulse text-blue-400" />;

    if (code <= 3) return <WiCloud className="animate-pulse text-gray-400" />;

    if (code <= 48) return <WiFog className="animate-pulse text-gray-500" />;

    if (code <= 67) return <WiRain className="animate-bounce text-blue-500" />;

    if (code <= 82) return <WiRain className="animate-bounce text-blue-600" />;

    return <WiThunderstorm className="animate-pulse text-purple-500" />;
  };

  const getCondition = (code) => {
    if (code === 0) return "Clear Sky";

    if (code <= 2) return "Mostly Sunny";

    if (code <= 3) return "Partly Cloudy";

    if (code <= 48) return "Cloudy / Hazy";

    if (code <= 55) return "Light Drizzle";

    if (code <= 65) return "Rain Showers";

    if (code <= 82) return "Heavy Rain";

    if (code <= 86) return "Snow Showers";

    if (code <= 99) return "Thunderstorm";

    return "Unknown Conditions";
  };
  if (loading) {
    return (
      <div className="animate-pulse bg-white p-4 rounded-xl shadow">
        Loading weather...
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl">
        Weather unavailable
      </div>
    );
  }

  return (
    <div className="bg-[#DCE9FF] dark:bg-[#282A2F] border-gray-300 dark:border-gray-800 transition-colors shadow rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Icon  */}
        <div className="text-5xl text-[#004AC6] dark:text-gray-200 drop-shadow-md transition-all duration-300">
          {getIcon(weather.weathercode)}
        </div>

        <div className="flex flex-col">
          {/* Temperature */}
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {weather.temperature}°C
          </p>

          {/* Location + Condition */}
          <div className="flex items-center gap-2">
            <h3 className="text-sm text-gray-500 dark:text-gray-300">
              Nairobi:
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {getCondition(weather.weathercode)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
