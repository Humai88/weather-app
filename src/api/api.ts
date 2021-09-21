import axios from "axios";
import { config } from "./../config";
let key = config.MY_KEY;
const api = {
  baseURL: "https://api.openweathermap.org/data/2.5/",
};
export const weatherAPI = (query: string) => {
  return axios.get<WeatherResponseType>(
    `${api.baseURL}weather?q=${query}&units=metric&appid=${key}`
  );
};

// Types
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
