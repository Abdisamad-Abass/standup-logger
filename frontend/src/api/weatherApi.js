export const fetchWeather = async () => {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-1.286389&longitude=36.817223&current=temperature_2m,weather_code",
      {
        signal: controller.signal,
      },
    );

    if (!res.ok) {
      throw new Error("Weather API failed");
    }

    const data = await res.json();

    return {
      temperature: data.current.temperature_2m,
      weathercode: data.current.weather_code,
      time: data.current.time,
    };
  } finally {
    clearTimeout(timeout);
  }
};
