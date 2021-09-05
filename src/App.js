import "./App.css";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

const api = {
  key: "fb502a460df654810d7d5eaddd73e670",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((result) => {
          console.log(weather);
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "App warm"
            : "App"
          : "App"
      }>
      <main>
        <div className='search__box'>
          <input
            type='text'
            className='search__bar'
            placeholder='Search...'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className='location__box'>
              <div className='location__location'>
                {weather.name}, {weather.sys.country},{" "}
                <ReactCountryFlag countryCode={weather.sys.country} svg />
              </div>{" "}
              <div className='location__date'>{dateBuilder(new Date())} </div>
            </div>
            <div className='weather__box'>
              <div className='weather__temp'>
                {Math.round(weather.main.temp)}°c
              </div>
              <div className='weather__details'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
