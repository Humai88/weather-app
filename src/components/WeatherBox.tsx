import React from "react";
import styles from "./WeatherBox.module.css";
export const WeatherBox: React.FC<WeatherBoxPropsType> = ({
  time,
  icon,
  temp,
}) => {
  return (
    <div className={styles.weatherBox}>
      <div className={styles.time}>{time}</div>
      <img
        className={styles.icon}
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      ></img>
      <div className={styles.temp}>{Math.round(temp)}°C</div>
    </div>
  );
};

// Types
type WeatherBoxPropsType = {
  time: string;
  icon: string;
  temp: number;
};
