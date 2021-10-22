import moment from "moment";
import React, { KeyboardEvent, useState } from "react";
import "./App.css";
import Input from "./UI/Input";
import loader from "./assets/images/Half-Moon-Loading.svg";
import { WeatherBox } from "./components/WeatherBox";
import { editTimeString } from "./helpers/functions";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "./store/store";
import {
  getCurrentWeatherTC,
  getWeatherForecastTC,
} from "./reducers/appReducer";
import { Preloader } from "./components/Preloader/Preloader";
import { catchErrorAC } from "./actions/actions";
function App() {
  const weather = useSelector((state: AppStore) => state.weather);
  const forecast = useSelector((state: AppStore) => state.forecast);
  const error = useSelector((state: AppStore) => state.error);
  const status = useSelector((state: AppStore) => state.status);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState(true);

  const search = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.length > 0) {
        dispatch(getCurrentWeatherTC(query));
        dispatch(getWeatherForecastTC(query));
        setValid(true);
        setTimeout(() => {
          dispatch(catchErrorAC(""));
        }, 3000);
      } else {
        setValid(false);
        setMessage("Please enter the city name");
      }
    }
  };
  const searchHandler = () => {
    if (query.length > 0) {
      dispatch(getCurrentWeatherTC(query));
      dispatch(getWeatherForecastTC(query));
      setValid(true);
      setTimeout(() => {
        dispatch(catchErrorAC(""));
      }, 3000);
    } else {
      setValid(false);
      setMessage("Please enter the city name");
    }
  };

  const date = moment().format("dddd, MMMM Do");

  return (
    <div className="app-wrapper">
      {status === "loading" && <Preloader />}
      <main>
        <div className="search-box">
          <Input
            type="text"
            className="search-input"
            placeholder="Search..."
            onChange={(e) => {
              setQuery(e.currentTarget.value);
            }}
            value={query}
            onKeyPress={search}
          />

          <button onClick={searchHandler}>search</button>
        </div>
        <div
          className="validation"
          style={!valid ? { display: "block" } : { display: "none" }}
        >
          {message}
        </div>
        {error && <div className="error">{error}</div>}
        {weather ? (
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
              {forecast &&
                forecast.map((e) => {
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
