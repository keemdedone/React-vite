import React, { useState, useEffect } from "react";
import { keys } from "../../model/model";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

const Weather = () => {
  const dateSelect = (date: string) => {
    const d = new Date().toString().slice(3, 15);
    return d;
  };

  return (
    <div className="page-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="location...."
          className="search-input"
        />
      </div>
      <div className="location-box">
        <div className="location"></div>
        <div className="date"></div>
      </div>
      <div className="weather-box">
        <div className="temperature"></div>
        <div className="weather-status"></div>
      </div>
    </div>
  );
};

export default Weather;
