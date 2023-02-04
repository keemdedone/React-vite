import React, { useState, useEffect } from "react";
import { keys, WeatherAPI } from "../../model/model";
import "./weather.scss";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherAPI>();

  const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((results) => {
          setQuery("");
          setWeather(results);
          console.log(results);
        });
    }
  };

  const dateSelect = (date: Date) => {
    return date.toString().slice(3, 15);
  };

  return (
    <div className="weather page-container">
      <div
        className={
          new Date().getHours() <= 12
            ? "weather-container morning"
            : new Date().getHours() <= 18
            ? "weather-container noon"
            : new Date().getHours() > 18
            ? "weather-container night"
            : "weather-container"
        }
      >
        <div className="search-box">
          <input
            type="text"
            placeholder="location...."
            className="search-input"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        {weather ? (
          <div className="weather-description">
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateSelect(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temperature">
                {weather.main.temp.toFixed(0)}
                <span className="celsius-symbol">°C</span>
              </div>
              <div className="weather-status">
                {weather.weather[0].main}, {weather.weather[0].description}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Weather;
