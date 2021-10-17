import moment from "moment";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { CityType, ListType, weatherAPI } from "./api/api";
import "./App.css";
import Input from "./UI/Input";
import loader from "./assets/images/Half-Moon-Loading.svg";
import { WeatherBox } from "./components/WeatherBox";
import { editTimeString } from "./helpers/functions";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<any>({});
  const [forecast, setForecast] = useState<ListType[]>([]);
  const [city, setCity] = useState<CityType>();
  const [error, setError] = useState("");

  const getWeather = () => {
    weatherAPI
      .getCurrentWeather(query)
      .then((res) => {
        setWeather(res.data);
        setQuery("");
        setError("");
      })
      .catch((err) => {
        setError("There is no such city. Please, try again.");
        setQuery("");
      });
    weatherAPI
      .getWeatherForecast(query)
      .then((res) => {
        setForecast(res.data.list);
        setCity(res.data.city);
        setQuery("");
        setError("");
      })
      .catch((err) => {
        setError("There is no such city. Please, try again.");
        setQuery("");
      });
  };
  const search = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getWeather();
    }
  };
  const searchHandler = () => {
    getWeather();
  };
  const date = moment().format("dddd, MMMM Do");

  return (
    <div className="app-wrapper">
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
          <button onClick={searchHandler}>search</button>
        </div>
        {error && <div className="error">{error}</div>}
        {typeof forecast !== "undefined" && typeof city !== "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{date}</div>
            </div>
            <div className="main-wrapper">
              <div className="weather-main">
                <img
                  className="icon-main"
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                ></img>
                <div>
                  <div className="temp-main">
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <div className="weather-main">{weather.weather[0].main}</div>
                </div>
              </div>

              <div className="descr-main">
                <div>
                  {Math.round(weather.wind.speed)}m/s
                  <br />
                  Wind
                </div>
                <div>
                  {weather.main.humidity}%
                  <br />
                  Humidity
                </div>
                <div>
                  {Math.round(weather.main.temp_max)}°C
                  <br />
                  High
                </div>
                <div>
                  {Math.round(weather.main.temp_min)}°C
                  <br />
                  Low
                </div>
              </div>
            </div>
            <div className="date">Forecast</div>
            <div className="data-wrapper">
              {forecast.map((e) => {
                return (
                  <WeatherBox
                    key={e.dt}
                    time={editTimeString(e.dt_txt)}
                    icon={e.weather[0].icon}
                    temp={e.main.temp}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <div>
            <div className="start-message">
              Enter city name and get current weather and 5 day weather forecast
            </div>
            <img className="loader" src={loader} alt="" />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
