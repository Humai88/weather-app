import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import loader from "./../../assets/images/Lazy-Loader.svg";
import styles from "./Preloader.module.css";

export const Preloader = () => {
  return (
    <Fragment>
      <div className={styles.backdrop}>
        <img className={styles.img} src={loader} alt="loading" />
      </div>
      ,
    </Fragment>
  );
};

// {
//   <img className={styles.img} src={loader} alt="loading" />
// }
