import moment from "moment";
import React, { KeyboardEvent, useState } from "react";
import { weatherAPI } from "./api/api";
import "./App.css";
import Input from "./UI/Input";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<any>({});

  const search = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      weatherAPI(query)
        .then((res) => {
          setWeather(res.data);
          setQuery("");
          console.log(res.data);
        })
        .catch((err) => {
          throw new Error();
        });
    }
  };
  const date = moment().format("dddd, MMMM Do, YYYY");

  const api = {
    key: "afe1289e31494c8586cf58e9e25eed17",
    base: "http://api.openweathermap.org/data/2.5/",
  };
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
            </div>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
