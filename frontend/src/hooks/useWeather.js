import { useEffect, useState } from "react";
import { fetchWeather } from "../api/weatherApi";

export default function useWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadWeather = async () => {
      let attempts = 0;

      while (attempts < 3) {
        try {
          const data = await fetchWeather();

          setWeather(data);
          setError(false);
          break;
        } catch (err) {
          attempts++;

          if (attempts === 3) {
            setError(true);
          }

          await new Promise((r) => setTimeout(r, 1000));
        }
      }

      setLoading(false);
    };

    loadWeather();
  }, []);

  return { weather, loading, error };
}
