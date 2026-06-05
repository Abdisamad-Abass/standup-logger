import useWeather from "../hooks/useWeather";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

export default function WeatherCard() {
  const { weather, loading, error } = useWeather();

  const getIcon = (code) => {
    if (code <= 1) return <WiDaySunny />;
    if (code <= 48) return <WiCloud />;
    return <WiRain />;
  };

  const getCondition = (code) => {
    if (code <= 1) return "Sunny";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Cloudy";
    if (code <= 67) return "Rainy";
    return "Stormy";
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
    <div className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 transition-colors shadow rounded-xl p-4 flex items-center justify-between">
      <div>
        <h3 className="text-sm text-gray-500 dark:text-gray-300">Nairobi</h3>

        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {weather.temperature}°C
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {getCondition(weather.weathercode)}
        </p>
      </div>

      <div className="text-5xl text-gray-800 dark:text-gray-200">
        {getIcon(weather.weathercode)}
      </div>
    </div>
  );
}
