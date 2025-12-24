import { useEffect, useState } from "react";
import cities from "./data/cities.json";
import Dropdown from "./dropdown.jsx";

const API_KEY = "cb07648adbbb31e814034878df73c95e";

export default function Weather() {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("weather_city"));
    if (saved) {
      setProvince(saved.province);
      setCity(saved.city);
      fetchWeather(saved.city);
    }
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},IR&limit=1&appid=${API_KEY}`
      );
      const geo = await geoRes.json();
      if (!geo[0]) return;

      const wRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geo[0].lat}&lon=${geo[0].lon}&units=metric&lang=fa&appid=${API_KEY}`
      );
      const w = await wRes.json();
      setWeather(w);

      localStorage.setItem(
        "weather_city",
        JSON.stringify({ province, city: cityName })
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-white/90 rounded-3xl p-6 text-center">
      <h2 className="text-xl font-bold mb-4">آب و هوا</h2>

      {weather && (
        <div className="mt-6">
          <div className="mb-1 text-sm text-gray-300">
            {city}
          </div>
          <div className="text-5xl font-bold">
            {Math.round(weather.main.temp)}°
          </div>
          <div className="mt-2 text-lg text-gray-200">
            {weather.weather[0].description}
          </div>
        </div>
      )}

      
      <Dropdown
        label="انتخاب استان"
        items={Object.keys(cities)}
        value={province}
        onChange={(p) => {
          setProvince(p);
          setCity("");
          setWeather(null);
        }}
      />

      {province && (
        <Dropdown
          label="انتخاب شهر"
          items={cities[province]}
          value={city}
          onChange={(c) => {
            setCity(c);
            fetchWeather(c);
          }}
        />
      )}
    </div>
  );
}
