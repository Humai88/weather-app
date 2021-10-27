import {
  ActionAppTypes,
  catchErrorAC,
  getCurrentWeatherAC,
  getForecastAC,
  RequestStatusType,
  setAppStatusAC,
} from "../actions/actions";
import { weatherAPI } from "../api/api";
import { ThunkType } from "./../store/store";

const initialState: AppInitialStateType = {
  status: "idle",
  error: "",
  weather: null,
  forecast: null,
};

export const appReducer = (
  state = initialState,
  action: ActionAppTypes
): AppInitialStateType => {
  switch (action.type) {
    case "CATCH_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };

    case "SET-STATUS":
      return {
        ...state,
        status: action.payload.status,
      };
    case "GET_CURRENT_WEATHER":
      return {
        ...state,
        weather: {
          name: action.payload.weather.name,
          sys: { country: action.payload.weather.sys.country },
          main: {
            temp: action.payload.weather.main.temp,
            temp_min: action.payload.weather.main.temp_min,
            temp_max: action.payload.weather.main.temp_max,
            humidity: action.payload.weather.main.humidity,
          },
          weather: action.payload.weather.weather.map((e) => ({ ...e })),
          wind: { speed: action.payload.weather.wind.speed },
        },
      };
    case "GET_FORECAST":
      return {
        ...state,
        forecast: action.payload.forecast.map((e) => ({ ...e })),
      };
    default:
      return state;
  }
};

// Thunks

export const getCurrentWeatherTC =
  (query: string, lat: number | null, lon: number | null): ThunkType =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    weatherAPI
      .getCurrentWeather(query, lat, lon)
      .then((res) => {
        dispatch(getCurrentWeatherAC(res.data));
      })
      .catch((error) => {
        dispatch(catchErrorAC(error.response.data.message));
      })
      .finally(() => {
        dispatch(setAppStatusAC("succeeded"));
      });
  };
export const getWeatherForecastTC =
  (query: string, lat: number | null, lon: number | null): ThunkType =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    weatherAPI
      .getWeatherForecast(query, lat, lon)
      .then((res) => {
        dispatch(getForecastAC(res.data.list));
      })
      .catch((error) => {
        dispatch(catchErrorAC(error.response.data.message));
      })
      .finally(() => {
        dispatch(setAppStatusAC("succeeded"));
      });
  };

// Types

export interface AppInitialStateType {
  status: RequestStatusType;
  error: string;
  weather: CurrentWeatherType | null;
  forecast: ForecastWeatherType[] | null;
}
export interface CurrentWeatherType {
  name: string;
  sys: { country: string };
  main: MainType;
  weather: WeatherType[];
  wind: { speed: number };
}
export interface MainType {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}
export interface ForecastWeatherType {
  dt: number;
  dt_txt: string;
  weather: WeatherType[];
  main: { temp: number };
}
export interface WeatherType {
  main: string;
  icon: string;
}
