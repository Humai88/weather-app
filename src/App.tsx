import moment from "moment";
import React, { KeyboardEvent, useState } from "react";
import { weatherAPI } from "./api/api";
import "./App.css";
import Input from "./UI/Input";
import loader from "./assets/images/circles.svg";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<any>({});
  const [error, setError] = useState("");

  const search = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      weatherAPI(query)
        .then((res) => {
          setWeather(res.data);
          setQuery("");
          setError("");
        })
        .catch((err) => {
          setError("There is no such city. Please, try again.");
          setQuery("");
        });
    }
  };
  const date = moment().format("dddd, MMMM Do, YYYY");

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 15
            ? "app-wrapper warm"
            : "app-wrapper"
          : "app-wrapper"
      }
    >
      <main>
        <div className="search-box">
          <Input
            type="text"
            className="search-input"
            placeholder="Search..."
            onChange={(e) => setQuery(e.currentTarget.value)}
            value={query}
            onKeyPress={search}
          />
          <button>search</button>
        </div>
        {error && <div className="error">{error}</div>}
        {typeof weather.main !== "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{date}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
              <img
                className="icon"
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              ></img>
            </div>
          </>
        ) : (
          <div>
            <div className="start-message">
              Enter city name and get current weather.
            </div>
            <img className="loader" src={loader} alt="" />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
