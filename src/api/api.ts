import axios from "axios";
import { config } from "./../config";
let key = config.MY_KEY;
const api = {
  baseURL: "https://api.openweathermap.org/data/2.5/",
};
export const weatherAPI = {
  getCurrentWeather(query: string) {
    return axios.get<WeatherResponseType>(
      `${api.baseURL}weather?q=${query}&units=metric&appid=${key}`
    );
  },
  getWeatherForecast(query: string) {
    return axios.get<ForecastResponseType>(
      `${api.baseURL}forecast?q=${query}&units=metric&appid=${key}`
    );
  },
};

// Types
export type ForecastResponseType = {
  cod: string;
  message: number;
  cnt: number;
  list: ListType[];
  city: CityType;
};
export type ListType = {
  dt: number;
  main: MainType;
  weather: WeatherType[];
  clouds: {
    all: number;
  };
  wind: WindType;
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};
export type CityType = {
  id: number;
  name: string;
  coord: CoordType;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};
export type WeatherResponseType = {
  coord: CoordType;
  weather: WeatherType[];
  base: number;
  main: MainType;
  visibility: number;
  wind: WindType;
  clouds: CloudsType;
  dt: number;
  sys: SysType;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type CoordType = {
  lon: number;
  lat: number;
};
type WeatherType = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
type MainType = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
};
type WindType = {
  speed: number;
  deg: number;
  gust: number;
};
type CloudsType = {
  all: number;
};
type SysType = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};
