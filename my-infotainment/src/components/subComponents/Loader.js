import React from "react";
import styles from "./loader.module.css";

/**
 * A functional component render loading animation
 * @constructor loader
 * @returns JSX Elements user interface 
 */
const Loader = () => {
  return (
    <div
      className={styles.loader}
      style={{
        position: "absolute",
        fontSize: "10px",
        left: "50%",
        top: "52%",
        textAlign: "center",
      }}
    ></div>
  );
};

export default Loader;
