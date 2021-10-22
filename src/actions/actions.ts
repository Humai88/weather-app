import {
  CurrentWeatherType,
  ForecastWeatherType,
} from "../reducers/appReducer";

export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: "SET-STATUS",
    payload: {
      status,
    },
  } as const;
};
export const catchErrorAC = (error: string) => {
  return { type: "CATCH_ERROR", payload: { error } } as const;
};
export const getCurrentWeatherAC = (weather: CurrentWeatherType) => {
  return { type: "GET_CURRENT_WEATHER", payload: { weather } } as const;
};
export const getForecastAC = (forecast: ForecastWeatherType[]) => {
  return { type: "GET_FORECAST", payload: { forecast } } as const;
};

// Types
export type ActionAppTypes =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof catchErrorAC>
  | ReturnType<typeof getCurrentWeatherAC>
  | ReturnType<typeof getForecastAC>;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
