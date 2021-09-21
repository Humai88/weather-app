import axios from "axios";
const api = {
  key: "afe1289e31494c8586cf58e9e25eed17",
  baseURL: "http://api.openweathermap.org/data/2.5/",
};
export const weatherAPI = (query: string) => {
  return axios.get<WeatherResponseType>(
    `${api.baseURL}weather?q=${query}&units=metric&appid=${api.key}`
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
