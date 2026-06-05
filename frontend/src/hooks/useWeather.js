import { useEffect, useState } from "react";
import { fetchWeather } from "../api/weatherApi";

export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchWeather();
        setWeather(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  return { weather, loading, error };
}
