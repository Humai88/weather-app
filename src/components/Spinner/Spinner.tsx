import { Fragment } from "react";
import loader from "./../../assets/images/Half-Moon-Loading.svg";
import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <Fragment>
      <div className={styles.backdrop}>
        <img className={styles.img} src={loader} alt="loading" />
      </div>
    </Fragment>
  );
};
