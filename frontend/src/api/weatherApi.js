export const fetchWeather = async () => {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=-1.286389&longitude=36.817223&current=temperature_2m,weather_code",
  );

  if (!res.ok) {
    throw new Error("Weather fetch failed");
  }

  const data = await res.json();

  return {
    temperature: data.current.temperature_2m,
    weathercode: data.current.weather_code,
    time: data.current.time,
  };
};
